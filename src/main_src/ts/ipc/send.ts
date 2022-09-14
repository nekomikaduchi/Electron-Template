import { mainWindow } from '../main';

//----------------------------------------
// IPC通信
// メイン → レンダラー
//----------------------------------------

/**
 * サンプルテストメソッド
 */
export const testSendMethod = () => {
  // ！！これはテスト用です！！
  // 10秒置きに乱数をレンダラープロセスに送る
  setInterval(() => {
    const rnd = Math.floor(Math.random());
    mainWindow?.webContents.send('onTestRandom', rnd);
  }, 10000);
};
