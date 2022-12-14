import { contextBridge, ipcRenderer, shell } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  // 関数で包んで部分的に公開する

  /////////////////////////////
  //
  // 以下 レンダラー → メイン
  //
  /////////////////////////////
  /**
   * ログインした時のメールアドレスを記録する
   * @param email メールアドレス
   * @returns
   */
  saveLoginEmail: async (email: string) => {
    return await ipcRenderer.invoke('save-login-email', email);
  },
  sendTestMessage: async (message: string) => {
    return await ipcRenderer.invoke('send-test-message', message);
  },
  openExternalLink: async (link: string) => {
    shell.openExternal(link);
  },

  /////////////////////////////
  //
  // 以下 メイン → レンダラー
  //
  /////////////////////////////
  on: (channel: string, callback: Function) =>
    ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
});
