import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  textSub: Subject<string> = new Subject<string>();
  constructor() {}

  /**
   * ローディングくるくるに文字列を表示
   * @param text テキスト
   */
  public fire = (text: string) => {
    this.textSub.next(text);
  };
}
