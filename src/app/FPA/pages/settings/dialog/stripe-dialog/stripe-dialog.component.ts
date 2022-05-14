import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';

import { AuthService } from 'src/app/shared/service/auth.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { CustomApiService } from 'src/app/shared/service/customApi.service';
import { StripeService } from 'src/app/shared/service/stripe.service';

import { UserBase } from 'src/app/shared/model/user';
import { MODE_TYPE } from 'src/app/shared/common/enum';
import { Constant } from 'src/app/shared/common/constant';

@Component({
  selector: 'app-stripe-dialog',
  templateUrl: './stripe-dialog.component.html',
  styleUrls: ['./stripe-dialog.component.scss'],
})
export class StripeDialogComponent implements OnInit {
  @Input() parentData: any;

  currentUser: UserBase;

  mode?: MODE_TYPE;

  statusMap = Constant.STATUS_MAP;

  cardLast4?: string;
  cardBrand?: string;
  cardExpire?: string;

  constructor(
    private modal: NgbModal,
    public modalRef: NgbActiveModal,
    private authService: AuthService,
    private utilService: UtilService,
    private apiService: CustomApiService,
    private stripeService: StripeService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.mode = this.parentData.mode;

    if (this.mode != MODE_TYPE.ADD) {
      this.init();
    }
  }

  private init = async () => {
    // const currentUser = this.authService.getCurrentUser();
    // // ローディングダイアログ表示
    // this.utilService.openLoading();
    // try {
    //   const res: any = await this.apiService.CallFuncOperateStripe(
    //     JSON.stringify({
    //       customerId: currentUser.customerId,
    //       operation: 'retrieve_customer_card',
    //     })
    //   );
    //   const parseResult = JSON.parse(res);
    //   if (parseResult.success) {
    //     const cards = parseResult.data?.data;
    //     cards?.forEach((payment: any) => {
    //       const card = payment.card;
    //       // カード下4桁
    //       this.cardLast4 = card?.last4;
    //       // カードブランド
    //       this.cardBrand = card?.brand;
    //       // カード有効期限
    //       this.cardExpire = `(${('00' + card?.exp_month).slice(-2)}/${
    //         card?.exp_year
    //       })`;
    //     });
    //   }
    //   // エラーがあった場合
    //   else {
    //     this.utilService.showSweetError(`${parseResult.data}`);
    //   }
    // } catch (error) {
    //   console.error('checkout() try catch error', error);
    //   return;
    // }
    // this.utilService.closeLoading();
  };

  /**
   * 新規カード登録
   */
  public createCard = async (): Promise<void> => {
    this.utilService
      .showSweetConfirm(
        `クレジットカード登録のために<br>Stripeページへ移動します。よろしいですか？`
      )
      .then((res) => {
        if (res.isConfirmed) {
          // ローディングダイアログ表示
          this.utilService.openLoading();

          this.stripeService.onPayClicked();
        }
      });
  };

  /**
   * カード変更
   */
  public changeCard = async (): Promise<void> => {
    this.utilService
      .showSweetConfirm(
        `クレジットカード変更のために<br>Stripeページへ移動します。よろしいですか？`
      )
      .then((res) => {
        if (res.isConfirmed) {
          // ローディングダイアログ表示
          this.utilService.openLoading();

          this.stripeService.onChangeClicked();
        }
      });
  };

  /**
   * カード解約
   */
  public cancelCard = async (): Promise<void> => {
    // 解約ダイアログ
    this.modal
      .open(CancelDialogComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: true,
        size: 'lg',
        scrollable: true,
      })
      .result.then((result) => {
        if (result == 'OK') {
          this.modalRef.close('OK');
        }
      });
  };
}
