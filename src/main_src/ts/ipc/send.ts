import { mainWindow } from '../main';

//----------------------------------------
// IPC通信
// メイン → レンダラー
//----------------------------------------

/**
 * ログイン画面へEmailを引き渡す
 * @param email
 */
export const sendLoginEmail = (email: string) => {
  mainWindow?.webContents.send('onSendLoginEmail', email);
};
