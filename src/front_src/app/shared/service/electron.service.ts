import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  public dataSubject = new Subject<any>(); // 追加
  public dataState = this.dataSubject.asObservable(); // 追加

  private eleAPI: any;

  constructor() {
    if (this.isElectron()) {
      this.eleAPI = (window as any).myAPI;
      // メインプロセスからの通知受信（TEST用）
      this.eleAPI.on('onTestRandom', (event: any, args: any) => {
        console.log(args);
      });
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  /**
   * Electronからの起動かどうか
   * @returns
   */
  private isElectron(): boolean {
    // @ts-ignore
    return !!((window as any) && (window as any).myAPI);
  }

  /**
   * メインプロセスにデータを送信(テスト用)
   * @param message メッセージ
   * @returns 戻り値
   */
  public async sendTestMessage(message: string): Promise<any> {
    if (this.eleAPI) {
      return await this.eleAPI?.sendTestMessage(message);
    } else {
      alert('Electronじゃないので実行できません。');
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
