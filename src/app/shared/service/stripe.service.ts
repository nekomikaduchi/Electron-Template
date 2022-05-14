import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { CustomApiService } from './customApi.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(
    public authService: AuthService,
    public utilService: UtilService,
    private apiService: CustomApiService
  ) {}

  /**
   * サブスク支払いページへ飛ぶ
   */
  async onPayClicked() {
    // const currentUser = this.authService.getCurrentUser();
    // try {
    //   const res: any = await this.apiService.CallFuncOperateStripe(
    //     JSON.stringify({
    //       userId: currentUser.id,
    //       trialDays: environment.trialDays,
    //       operation: 'create_checkout_session_create_card',
    //     })
    //   );
    //   const parseResult = JSON.parse(res);
    //   if (parseResult.success) {
    //     // クレカ登録ページへ遷移
    //     location.href = parseResult.data;
    //   }
    //   // エラーがあった場合
    //   else {
    //     this.utilService.showSweetError(`${parseResult.data}`);
    //   }
    // } catch (error) {
    //   console.error('checkout() try catch error', error);
    // }
  }

  /**
   * クレジットカード変更
   */
  async onChangeClicked() {
    // const currentUser = this.authService.getCurrentUser();
    // try {
    //   const res: any = await this.apiService.CallFuncOperateStripe(
    //     JSON.stringify({
    //       customerId: currentUser.customerId,
    //       operation: 'create_checkout_session_change_card',
    //     })
    //   );
    //   const parseResult = JSON.parse(res);
    //   if (parseResult.success) {
    //     // クレカ変更ページへ遷移
    //     location.href = parseResult.data;
    //   }
    //   // エラーがあった場合
    //   else {
    //     this.utilService.showSweetError(`${parseResult.data}`);
    //   }
    // } catch (error) {
    //   console.error('checkout() try catch error', error);
    // }
  }
}
