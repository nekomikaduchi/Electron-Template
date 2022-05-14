import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/shared/service/auth.service';
import { CustomApiService } from 'src/app/shared/service/customApi.service';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss'],
})
export class CancelDialogComponent implements OnInit {
  currentUser: any;

  constructor(
    public modalRef: NgbActiveModal,
    private apiService: CustomApiService,
    private authService: AuthService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  /**
   * 内容確定ダイアログ表示
   */
  confirmNaiyo(e: Event): void {
    e.preventDefault();

    this.utilService
      .showSweetConfirm(
        `${
          this.currentUser.stripe?.cancelPeriodEnd
            ? '解約をキャンセルします。<br>よろしいですか？'
            : 'サブスクリプションを解約します。<br>本当によろしいですか？'
        }`
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.cancelSubscription();
        }
      });
  }

  /**
   * サブスクリプション解約／解約キャンセル
   */
  private async cancelSubscription(): Promise<void> {
    // // ローディングダイアログ表示
    // this.utilService.openLoading();
    // try {
    //   const res: any = await this.apiService.CallFuncOperateStripe(
    //     JSON.stringify({
    //       userId: this.currentUser.id,
    //       subscriptionId: this.currentUser.stripe?.subscriptionId,
    //       operation: this.currentUser.stripe?.cancelPeriodEnd
    //         ? 'subscription_stop_cancel'
    //         : 'subscription_stop',
    //     })
    //   );
    //   const parseResult = JSON.parse(res);
    //   if (parseResult.success) {
    //     this.utilService
    //       .showSweetSuccess(
    //         `${
    //           this.currentUser.stripe?.cancelPeriodEnd
    //             ? '解約をキャンセルしました。'
    //             : '解約処理が完了しました。<br>ご利用ありがとうございました。'
    //         }`
    //       )
    //       .then((res: any) => {
    //         if (res.isConfirmed) {
    //           location.href = '/login';
    //         }
    //       });
    //   }
    //   // エラーがあった場合
    //   else {
    //     this.utilService.showSweetWarning(parseResult.data);
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   this.utilService.showSweetError(error?.errors[0].message);
    // }
    // this.utilService.closeLoading();
  }
}
