import { MenuItemConstructorOptions } from 'electron';

const {
  app,
  Menu,
  session,
  shell,
  ipcMain,
  BrowserWindow,
  dialog,
} = require('electron');
const url = require('url');
const path = require('path');
// puppeteerモジュール読み込み
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');
// electron-logモジュール読み込み
const eLog = require('electron-log');
// // 自動更新モジュール読み込み
// const { autoUpdater } = require('electron-updater');
// autoUpdater.autoDownload = false;

import * as Moment from 'moment';

// config.jsonへの読み書きモジュールを読み込み
const config = require('./config');
const log = require('./log');

// // 楽天に関する操作のモジュールを読み込み
// const rakuten = require('./rakuten');
// // 楽天ビックに関する操作のモジュールを読み込み
// const rakutenBic = require('./rakutenBic');
// // 楽天ブックスに関する操作のモジュールを読み込み
// const rakutenBooks = require('./rakutenBooks');

// デバッグモードフラグ
let isDebug = false;
// メインウィンドウ
let mainWindow: any;
// puppeteerウィンドウ
let pupBrowser: any = null;
let pupWindows: any = {};

/**
 * プロセスまで上がってきた例外エラー処理
 */
process.on('uncaughtException', (err) => {
  // ログファイルへ記録
  eLog.error(process.pid, err);
  // アプリを終了する (継続しない方が良い)
  app.quit();
});

/**
 * 0：終了処理実行前
 * 1：終了処理実行後
 */
let closeType: number = 0;

/**
 * 初期処理
 * 1. ログファイル名の変更
 * 2. app.onより前にpuppeteerに接続させる
 */
const init = async () => {
  // ログファイル名の変更
  const curr = eLog.transports.file.fileName;
  eLog.transports.file.fileName = `${Moment().format('YYYYMMDD')}_${curr}`;

  // TODO:アップデートに関する情報をログファイルへ出力
  // autoUpdater.logger = eLog;
  // autoUpdater.logger.transports.file.level = 'info';

  await pie.initialize(app);
  pupBrowser = await pie.connect(app, puppeteer);
};
init();

/**
 * メインウィンドウの作成
 */
const createMainWindow = async () => {
  // ステータスのリセット
  await config.resetItemStatus();
  // キャッシュの削除
  await session.defaultSession.clearCache();
  await session.defaultSession.clearStorageData();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
      nodeIntegration: true,
      // レンダラープロセスに公開するAPIのファイル
      // v12 からデフォルト=true になった
      contextIsolation: false,
      // nodeIntegration: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('close', (e: Event) => {
    if (closeType == 0) {
      e.preventDefault();
      // レンダラープロセスに通知(終了)
      mainWindow.webContents.send('delete-login', {});
    }
  });

  mainWindow.on('closed', () => {
    // puppeteerで操作していたウィンドウを閉じる
    for (const key in pupWindows) {
      pupWindows[key].destroy();
    }
    mainWindow = null;
  });
};

/**
 * メニューの作成
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

/**
 * ログフォルダの作成
 */
const makeDir = () => {
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

app.on('ready', async () => {
  // デバッグフラグを取得
  isDebug = await config.getConfig('debug');
  // ウィンドウメニューをカスタマイズ
  makeDir();
  // ウィンドウメニューをカスタマイズ
  initWindowMenu();
  // メインウィンドウの作成
  createMainWindow();

  eLog.info(process.pid, 'start RakutenAutoOrder.');

  // TODO:アップデートをチェック
  // autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//-------------------------------------------
// 自動アップデート関連のイベント処理
//-------------------------------------------
// // アップデートをチェック開始
// autoUpdater.on('checking-for-update', () => {
//   eLog.info(process.pid, 'checking-for-update...');
// });
// // アップデートが見つかった
// autoUpdater.on('update-available', (ev: any, info: any) => {
//   eLog.info(process.pid, 'Update available.');
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['ダウンロード', 'あとで'],
//     message: 'アップデート',
//     detail: '新しいバージョンが公開されています。ダウンロードしますか？',
//   };

//   // ダイアログを表示
//   dialog
//     .showMessageBox(mainWindow, dialogOpts)
//     .then(async (returnValue: any) => {
//       if (returnValue.response === 0) {
//         const updateUrl =
//           autoUpdater.updateInfoAndProvider.provider.baseUrl +
//           autoUpdater.updateInfoAndProvider.info.path;
//         await shell.openExternal(updateUrl);
//       }
//     });
// });
// // アップデートがなかった（最新版だった）
// autoUpdater.on('update-not-available', (ev: any, info: any) => {
//   eLog.info(process.pid, 'Update not available.');
// });
// // エラーが発生
// autoUpdater.on('error', (err: any) => {
//   eLog.error(process.pid, err);
// });
//-------------------------------------------

// /**
//  * puppeteerで操作するウィンドウを作成
//  * @param {string} key キー
//  * @returns
//  */
// const createPupWindow = async (key: string) => {
//   let pupWindow: any;

//   if (pupWindows[key]) {
//     pupWindow = pupWindows[key];
//   } else {
//     pupWindow = new BrowserWindow({
//       width: 900,
//       height: 750,
//       autoHideMenuBar: true,
//       webPreferences: {
//         nodeIntegration: false,
//         contextIsolation: false,
//         webSecurity: true,
//         images: false,
//         // javascript: false, // javascriptはロードしないと動かない
//       },
//       resizable: false,
//       fullscreenable: false,
//       fullscreen: false,
//       show: isDebug, // バックグラウンドで動かすならfalse
//     });

//     // puppeteerウィンドウリストに追加
//     pupWindows[key] = pupWindow;
//   }

//   const page = await pie.getPage(pupBrowser, pupWindow);
//   await page.evaluateOnNewDocument(() => {
//     Object.defineProperty(navigator, 'webdriver', () => {});
//     // @ts-ignore
//     delete navigator.__proto__.webdriver;
//   });

//   return {
//     page: page,
//     window: pupWindow,
//   };
// };

// アプリ情報取得
ipcMain.handle('get-app-info', async (event: any, arg: any) => {
  const appInfo = {
    version: app.getVersion(),
  };
  return appInfo;
});

// 右クリックメニューの登録
ipcMain.handle('show-context-menu', async (event: any, arg: any) => {
  const copyTmp = {
    label: 'コピー （Ctrl + C）',
    click: () => {
      event.sender.send('context-menu-command', 'copy');
    },
  };
  const pasteTmp = {
    label: 'ペースト（Ctrl + V）',
    click: () => {
      event.sender.send('context-menu-command', 'paste');
    },
  };

  let template: MenuItemConstructorOptions[] = [];

  if (arg.copy) {
    template.push(copyTmp);
  } else if (arg.paste) {
    template.push(pasteTmp);
  }

  const content = BrowserWindow.fromWebContents(event.sender);

  console.log(content);

  // if (content) {
  //   const menu = Menu.buildFromTemplate(template);
  //   menu.popup(content);
  // }
});

// // 楽天ログインチェック
// ipcMain.handle('account-check-rakuten', async (event: any, arg: any) => {
//   // puppeteer用ウィンドウを作成
//   const pup = await createPupWindow('check-window');
//   // アカウントチェック
//   const retVal = await rakuten.accountCheck(pup.page, arg);
//   // 作成したウィンドウを閉じる
//   pupWindows['check-window'].destroy();
//   delete pupWindows['check-window'];

//   return retVal;
// });

// // 楽天商品情報取得
// ipcMain.handle('get-item-info', async (event: any, url: string) => {
//   // puppeteer用ウィンドウを作成
//   const pup = await createPupWindow('get-item-info');

//   let retVal: any;
//   try {
//     if (url.includes('https://biccamera.rakuten.co.jp/item/')) {
//       // 楽天商品情報(楽天ビック)取得
//       retVal = await rakutenBic.getItemInfoBic(pup.page, url);
//     } else if (url.includes('https://books.rakuten.co.jp/rb/')) {
//       // 楽天商品情報(楽天ブックス)取得
//       retVal = await rakutenBooks.getItemInfoBooks(pup.page, url);
//     } else {
//       // 楽天商品情報取得
//       retVal = await rakuten.getItemInfo(pup.page, url);
//     }
//     // ログ出力
//     log.info('追加', retVal);
//   } catch (error) {
//     retVal = error;
//   }
//   // 作成したウィンドウを閉じる
//   pupWindows['get-item-info'].destroy();
//   delete pupWindows['get-item-info'];

//   return retVal;
// });

// // 楽天商品情報更新
// ipcMain.handle('update-item-info', async (event: any, item: any) => {
//   // Config.jsonから楽天アプリID取得
//   const appId = await config.getConfig('accountSettings.appId');

//   // 楽天商品情報更新
//   const retVal = await rakuten.updateItemInfo(appId, item);
//   Object.assign(item, retVal);

//   return item;
// });

// // 楽天商品情報削除
// ipcMain.handle('delete-item-info', async (event: any, itemCode: string) => {
//   // キー作成
//   const key = 'items.' + itemCode;
//   // Config.jsonからデータ取得
//   const data = await config.getConfig(key);
//   // ログ出力
//   log.info('削除', data);

//   return await config.deleteConfig(key);
// });

// // 楽天商品情報削除
// ipcMain.handle('delete-item-reserve', async (event: any, itemCode: string) => {
//   // キー作成
//   const key = 'reserveItems.' + itemCode;
//   // Config.jsonからデータ取得
//   const data = await config.getConfig(key);
//   // ログ出力
//   log.info('削除', data);

//   return await config.deleteConfig(key);
// });

// // 監視開始
// ipcMain.handle('start-monitor', async (event: any, itemCode: string) => {
//   // ステータスを監視中にする
//   await config.saveConfig(`items.${itemCode}.status`, '1');

//   // 定期実行
//   loopProc(itemCode);

//   return {
//     status: '1',
//     itemCode: itemCode,
//   };
// });

// /**
//  * 定期実行処理
//  * @param itemCode アイテムコード
//  */
// const loopProc = async (itemCode: string) => {
//   // リトライカウント
//   let retryCnt: number = 0;
//   // キー作成
//   const key = 'items.' + itemCode;
//   // Config.jsonからデータ取得
//   const data = await config.getConfig(key);
//   // Config.jsonから楽天アプリID取得
//   const appId = await config.getConfig('accountSettings.appId');

//   // 定期実行
//   setTimeout(
//     async function updateInfo(key, data) {
//       try {
//         if ((await config.getConfig(key + '.status')) === '0') {
//           return;
//         }
//         // 商品情報更新
//         const updateData = await rakuten.updateItemInfo(appId, data);
//         updateData['status'] = '1';
//         Object.assign(data, updateData);
//         // 在庫があった時は購入フェーズへ
//         if (data.stock) {
//           // puppeteer用ウィンドウを作成
//           const pup = await createPupWindow(itemCode);

//           const authInfo = await config.getConfig('accountSettings');

//           let retVal: any;

//           if (data.shopId === 'biccamera') {
//             retVal = await rakutenBic.buyItemBic(
//               pup.page,
//               data,
//               authInfo,
//               isDebug
//             );
//           } else if (data.shopId === 'book') {
//             retVal = await rakutenBooks.buyItemBooks(
//               pup.page,
//               data,
//               authInfo,
//               isDebug
//             );
//           } else {
//             retVal = await rakuten.buyItem(pup.page, data, authInfo, isDebug);
//           }

//           if (retVal) {
//             data['status'] = '2';
//             // ログ出力
//             log.info('購入完了', data);
//           } else {
//             // ログ出力
//             log.info('購入エラー', data);
//             // 実購入数はここで消す
//             delete data['buyNum'];
//             throw new Error('購入に失敗しました。');
//           }
//         }
//         await config.saveConfig(key, data);
//         // レンダラープロセスに通知
//         mainWindow.webContents.send('update-item', data);
//         if (data.status === '1') {
//           // リトライカウントを戻す
//           retryCnt = 0;
//           // 処理を繰り返す
//           setTimeout(updateInfo, data.interval, key, data);
//         } else {
//           // 購入済の場合はウィンドウを閉じる
//           pupWindows[itemCode].destroy();
//           delete pupWindows[itemCode];
//         }
//       } catch (error: any) {
//         // エラー時
//         eLog.error(process.pid, error);

//         if (
//           (data.status === '94' ||
//             error === 'retry' ||
//             error.message.includes('ms exceeded') ||
//             error.message.includes('most likely because of a navigation')) &&
//           retryCnt++ < 5
//         ) {
//           // リトライ
//           setTimeout(updateInfo, 5000, key, data);
//         } else {
//           // ページが見つからなかった時などの想定内のエラー時のみ
//           // 監視停止で強制的にページが閉じられた時は記録しない。
//           if (data.status === '91') {
//             log.info('購入エラー', data);
//           } else if (data.status === '92') {
//             log.info('NotFoundエラー', data);
//           } else if (data.status === '93') {
//             log.info('パラメータ不正エラー', data);
//           } else {
//             log.info('不明なエラー', data);
//           }
//           data['status'] = '9';
//           // 処理エラーとして登録
//           await config.saveConfig(key, data);
//           if (pupWindows[itemCode]) {
//             // ウィンドウを閉じる
//             pupWindows[itemCode].destroy();
//             delete pupWindows[itemCode];
//           }

//           // レンダラープロセスに通知
//           mainWindow.webContents.send('error-get-item', {
//             item: data,
//             error: error.message,
//           });
//         }
//       }
//     },
//     data.interval,
//     key,
//     data
//   );
// };

// // 監視開始
// ipcMain.handle(
//   'start-monitor-reserve',
//   async (event: any, itemCode: string) => {
//     // puppeteer用ウィンドウを作成
//     const pup = await createPupWindow(itemCode + '-reserve');

//     // キー作成
//     const key = 'reserveItems.' + itemCode;
//     // Config.jsonからデータ取得
//     const data = await config.getConfig(key);
//     data['status'] = '1';
//     await config.saveConfig(key, data);

//     // 定期実行
//     loopProcReserve(itemCode, pup);

//     return {
//       status: '1',
//       itemCode: itemCode,
//     };
//   }
// );

// /**
//  * 定期実行処理
//  * @param itemCode アイテムコード
//  * @param pup puppeteerページオブジェクト
//  */
// const loopProcReserve = async (itemCode: string, pup: any) => {
//   // リトライカウント
//   let retryCnt: number = 0;
//   // キー作成
//   const key = 'reserveItems.' + itemCode;
//   // windowキー作成
//   const pupKey = itemCode + '-reserve';
//   // Config.jsonからデータ取得
//   const data = await config.getConfig(key);
//   const authInfo = await config.getConfig('accountSettings');

//   setTimeout(
//     async function saiki(page, key, data) {
//       if (
//         Moment().format('YYYY/MM/DD HH:mm') === data.reserveTime ||
//         retryCnt > 0
//       ) {
//         try {
//           let retVal;
//           if (data.shopId === 'biccamera') {
//             retVal = await rakutenBic.buyItemBic(page, data, authInfo, isDebug);
//           } else if (data.shopId === 'book') {
//             retVal = await rakutenBooks.buyItemBooks(
//               page,
//               data,
//               authInfo,
//               isDebug
//             );
//           } else {
//             retVal = await rakuten.buyItem(page, data, authInfo, isDebug);
//           }
//           if (retVal) {
//             data['status'] = '2';
//             // ログ出力
//             log.info('購入完了', data);
//           } else {
//             // ログ出力
//             log.info('購入エラー', data);
//             // 実購入数はここで消す
//             delete data['buyNum'];
//             throw new Error('購入に失敗しました。');
//           }
//           await config.saveConfig(key, data);
//           // レンダラープロセスに通知
//           mainWindow.webContents.send('update-item', data);
//           // 購入済の場合はウィンドウを閉じる
//           pupWindows[pupKey].destroy();
//           delete pupWindows[pupKey];
//         } catch (error: any) {
//           // エラー時
//           eLog.error(process.pid, error);
//           if (
//             (error === 'retry' || error.message.includes('ms exceeded')) &&
//             retryCnt++ < 5
//           ) {
//             // リトライ
//             setTimeout(saiki, 0, page, key, data);
//           } else {
//             // ページが見つからなかった時などの想定内のエラー時のみ
//             // 監視停止で強制的にページが閉じられた時は記録しない。
//             if (!page.isClosed()) {
//               if (data.status === '91') {
//                 log.info('購入エラー', data);
//               } else if (data.status === '92') {
//                 log.info('NotFoundエラー', data);
//               } else {
//                 log.info('不明なエラー', data);
//               }
//               data['status'] = '9';
//               // 処理エラーとして登録
//               await config.saveConfig(key, data);
//               // ウィンドウを閉じる
//               pupWindows[pupKey].destroy();
//               delete pupWindows[pupKey];

//               // レンダラープロセスに通知
//               mainWindow.webContents.send('error-get-item', {
//                 item: data,
//                 error: error.message,
//               });
//             }
//           }
//         }
//       } else {
//         // Config.jsonからデータ取得
//         const status = await config.getConfig(key + '.status');
//         // ステータスが監視中ならば
//         if (status === '1') {
//           // リトライ
//           setTimeout(saiki, 1000, page, key, data);
//         }
//       }
//     },
//     1000,
//     pup.page,
//     key,
//     data
//   );
// };

// // 監視停止
// ipcMain.handle('stop-monitor', async (event: any, itemCode: string) => {
//   // ウィンドウを閉じる
//   if (pupWindows[itemCode]) {
//     pupWindows[itemCode].destroy();
//     delete pupWindows[itemCode];
//   }

//   // キー作成
//   const key = 'items.' + itemCode + '.status';
//   // ステータスを更新
//   await config.saveConfig(key, '0');
//   return itemCode;
// });

// // 監視停止
// ipcMain.handle('stop-monitor-reserve', async (event: any, itemCode: string) => {
//   // ウィンドウを閉じる
//   pupWindows[itemCode + '-reserve'].destroy();
//   delete pupWindows[itemCode + 'reserve'];

//   // キー作成
//   const key = 'reserveItems.' + itemCode + '.status';
//   // ステータスを更新
//   await config.saveConfig(key, '0');
//   return itemCode;
// });

// // 監視を全て停止
// ipcMain.handle('stop-monitor-all', async (event: any, any: any) => {
//   // puppeteerで操作していたウィンドウをすべて閉じる
//   for (const key in pupWindows) {
//     pupWindows[key].destroy();
//     // ステータスを更新
//     await config.saveConfig(key, '0');
//   }
//   return;
// });

// config.jsonへのデータ書き込み
ipcMain.handle('save-config', async (event: any, arg: any) => {
  if (arg.key === 'debug') {
    isDebug = arg.value;
  }
  return await config.saveConfig(arg.key, arg.value);
});

// config.jsonからデータ読み込み
ipcMain.handle('get-config', async (event: any, key: string) => {
  return await config.getConfig(key);
});

// config.jsonからデータを削除
ipcMain.handle('delete-config', async (event: any, key: string) => {
  return await config.deleteConfig(key);
});

// logからデータを取得
ipcMain.handle('get-log', async (event: any, arg: any) => {
  // ログ出力
  return await log.getLog();
});

// electron-logを出力
ipcMain.handle('output-log', async (event: any, info: any) => {
  // ログ出力
  return await eLog.error(process.pid, info);
});

// アプリの終了
ipcMain.handle('app-end', async (event: any, obj: any) => {
  // mainWindowを閉じる
  closeType = 1;
  mainWindow.close();
});
