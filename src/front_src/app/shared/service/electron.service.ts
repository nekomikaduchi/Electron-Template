import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  public dataSubject = new Subject<any>(); // 追加
  public dataState = this.dataSubject.asObservable(); // 追加

  public loginEmail: string = '';

  private eleAPI: any;

  constructor() {
    if (this.isElectron()) {
      this.eleAPI = (window as any).myAPI;

      // リスナー登録
      this.registerListener();
    } else {
      console.warn('Electronじゃないです！');
    }
  }

  /**
   * Electronからの起動かどうか
   * @returns
   */
  private isElectron = (): boolean => {
    // @ts-ignore
    return !!((window as any) && (window as any).myAPI);
  };

  /**
   * メインプロセスからの通知を受信するリスナー登録
   */
  private registerListener = (): void => {
    // メインプロセスからログインEmailを受信
    this.eleAPI.on('onSendLoginEmail', (event: any, email: string) => {
      this.loginEmail = email;
    });
  };

  /**
   * ログインした時のメールアドレスをElectronStoreに記録する
   * @param email メールアドレス
   * @returns 戻り値
   */
  public async saveLoginEmail(email: string): Promise<any> {
    if (this.eleAPI) {
      return await this.eleAPI?.saveLoginEmail(email);
    }
  }

  /**
   * OSのデフォルトブラウザでリンクを開く
   * @param url URL
   */
  public openExternalLink(url: string): void {
    if (this.eleAPI) {
      this.eleAPI?.openExternalLink(url);
    } else {
      alert('Electronじゃないので実行できません。');
    }
  }
}
