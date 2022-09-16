import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';
// 保存領域
const eleStore = new ElectronStore();

//----------------------------------------
// IPC通信
// レンダラー → メイン
//----------------------------------------

export const registerListener = () => {
  /**
   * テスト用
   * 語尾に "にゃん" を付けて返す
   */
  ipcMain.handle('send-test-message', (event, message: string) => {
    return `${message}にゃん`;
  });

  /**
   * ログインした時のメールアドレスを記録する
   * @param email メールアドレス
   */
  ipcMain.handle('save-login-email', (event, email: string) => {
    eleStore.set('login-email', email);
  });
};
