import { ipcMain } from 'electron';

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
};
