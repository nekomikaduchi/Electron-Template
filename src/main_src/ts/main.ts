// アプリケーション作成用のモジュールを読み込み
import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  shell,
} from 'electron';

const url = require('url');
const path = require('path');

import { testSendMethod } from './ipc/send';
import { registerListener } from './ipc/listen';

// デバッグモードフラグ
// @ts-ignore
export let isDebug: boolean = process.env.NODE_ENV === 'development';
// メインウィンドウ
export let mainWindow: BrowserWindow | null;

// 二重起動確認用
const gotTheLock = app.requestSingleInstanceLock();
// false(既に起動)の場合　即終了
if (!gotTheLock) {
  console.log('二重起動ストップ!! 即停止!!');
  app.quit();
}

/**
 * メインウィンドウの作成
 */
const createMainWindow = () => {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
      nodeIntegration: true,
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // メインウィンドウに表示するURLを指定
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // デベロッパーツールの起動
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // メイン → レンダラーへIPC通信
  // サンプルテスト用です。
  testSendMethod();
};

/**
 * ログフォルダの作成
 */
const makeLogDir = () => {
  const fs = require('fs');

  fs.mkdir('log/info', { recursive: true }, (err: any) => {
    if (err) {
      throw err;
    }
  });
  fs.mkdir('log/error', { recursive: true }, (err: any) => {
    if (err) {
      throw err;
    }
  });
};

/**
 * メインメニューの作成
 */
const initWindowMenu = () => {
  const operationSubmenu: MenuItemConstructorOptions[] = [
    // { label: '画面更新', role: 'reload' },
    // { label: '強制更新', role: 'forceReload' },
    // { label: 'DevToolsを開く', role: 'toggleDevTools' },
    // { type: 'separator' },
    // { role: 'resetZoom' },
    // { role: 'zoomIn' },
    // { role: 'zoomOut' },
    // { type: 'separator' },
    { label: 'フルスクリーン/解除', role: 'togglefullscreen' },
  ];

  if (isDebug) {
    operationSubmenu.push({ label: 'DevToolsを開く', role: 'toggleDevTools' });
  }

  const template: MenuItemConstructorOptions[] = [
    {
      label: 'ファイル',
      submenu: [{ label: '終了', role: 'quit' }],
    },
    {
      label: '操作',
      submenu: operationSubmenu,
    },
    {
      label: 'ヘルプ',
      role: 'help',
      submenu: [
        { label: '契約状況' },
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

// 初期化が完了した時の処理
app.whenReady().then(() => {
  isDebug = true;

  // ログフォルダ作成
  makeLogDir();
  // ウィンドウメニューをカスタマイズ
  initWindowMenu();
  // メインウィンドウの作成
  createMainWindow();
  // IPC通信リスナ登録
  registerListener();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on('activate', () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了する
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ホットリロード
if (isDebug) {
  const mainSrcDir = path.join(__dirname);
  const frontSrcDir = path.join(__dirname, '..', '..', '..', 'dist');
  const eleDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'node_modules',
    'electron',
    'dist',
    'electron.exe'
  );

  require('electron-reload')([mainSrcDir, frontSrcDir], {
    electron: eleDir,
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}
