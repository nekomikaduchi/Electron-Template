import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/shared/service/auth.service';
import { SettingService } from 'src/app/shared/service/setting.service';
import { UtilService } from 'src/app/shared/service/util.service';

import { UserBase } from 'src/app/shared/model/user';
import { Constant } from 'src/app/shared/common/constant';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentUser: UserBase;

  csvTypeAry: any[] = Constant.CSV_TYPE_ARY;

  spApiFlg: boolean = false;
  lineFlg: boolean = false;

  rakuForm = new FormGroup({
    spuRatio: new FormControl(0, [Validators.required, Validators.min(0)]),
    appId: new FormControl('', [Validators.pattern('[0-9]{19}')]),
  });

  notifyForm = new FormGroup({
    lineToken: new FormControl('', [Validators.pattern('[0-9a-zA-Z]+')]),
  });

  amakariForm = new FormGroup({
    watchRatio: new FormControl(10, [Validators.required, Validators.min(0)]),
  });

  modalForm = new FormGroup({
    shopName: new FormControl('', [Validators.required]),
    shopCode: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9-_]+'),
    ]),
  });

  focusSpuRatio: boolean = false;
  focusWatchRatio: boolean = false;

  // SP-API連携完了フラグ
  spApiDoneFlg: boolean = false;
  // LINE連携完了フラグ
  lineDoneFlg: boolean = false;
  // Stripe連携完了フラグ
  stripeDoneFlg: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private settingService: SettingService,
    private utilService: UtilService,
    private modalService: NgbModal
  ) {
    // 同じrouteを選択した時にリロードされるようにする設定
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // クエリパラメータが設定されている場合に取得
    this.route.queryParams.subscribe((params) => {
      const spapiInt = params['spapi_integration']
        ? Number(params['spapi_integration'])
        : 0;
      const lineInt = params['line_integration']
        ? Number(params['line_integration'])
        : 0;
      const stripeInt = params['stripe_integration']
        ? Number(params['stripe_integration'])
        : 0;
      const changeCard = params['change_card']
        ? Number(params['change_card'])
        : 0;

      // SP-API連携完了フラグがあれば取得
      this.spApiDoneFlg = spapiInt ? true : false;
      // LINE連携完了フラグがあれば取得
      this.lineDoneFlg = lineInt ? true : false;
      // Stripe連携完了フラグがあれば取得
      this.stripeDoneFlg = stripeInt || changeCard ? true : false;
      this.location.replaceState('/home/settings');
    });

    this.currentUser = this.authService.getCurrentUser();
  }

  get spuRatio() {
    return this.rakuForm.get('spuRatio');
  }
  get appId() {
    return this.rakuForm.get('appId');
  }
  get shopName() {
    return this.modalForm.get('shopName');
  }
  get shopCode() {
    return this.modalForm.get('shopCode');
  }
  get watchRatio() {
    return this.amakariForm.get('watchRatio');
  }
  get lineToken() {
    return this.notifyForm.get('lineToken');
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    if (this.lineDoneFlg) {
      this.utilService.showSweetSuccess(`LINE連携に成功しました。`).then(() => {
        this.router.navigate(['/home/settings']);
      });
    }
    if (this.spApiDoneFlg) {
      this.utilService
        .showSweetSuccess(`SP-API連携に成功しました。`)
        .then(() => {
          this.router.navigate(['/home/settings']);
        });
    }
    if (this.stripeDoneFlg) {
      this.utilService
        .showSweetSuccess(`クレジットカード登録に成功しました。`)
        .then(() => {
          this.router.navigate(['/home/settings']);
        });
    }

    // SP-API連携状態を取得
    this.spApiFlg = this.currentUser.spApiFlg;
    // LINE連携状態を取得
    this.lineFlg = this.currentUser.lineFlg;

    // アマカリ設定を画面に反映
    if (this.currentUser?.settings) {
      const settings = this.currentUser.settings;
      this.amakariForm.setValue(settings?.amakari);
    }
  }

  /**
   * SP-API連携リンクを別タブで開く
   */
  openSpApiLink(): void {
    const userId = this.authService.getCurrentUser().id;

    let url = new URL(
      'https://sellercentral.amazon.co.jp/apps/authorize/consent'
    );
    url.searchParams.append(
      'application_id',
      'amzn1.sp.solution.4d7044e3-4d2d-4112-997f-01e41ffbe4f7'
    );
    url.searchParams.append('version', 'beta');
    url.searchParams.append('state', userId);
    url.searchParams.append('redirect_uri', environment.spapiRedirectUrl);

    location.href = url.href;
  }

  /**
   * LINE連携リンクを別タブで開く
   */
  openLineLink(): void {
    const userId = this.authService.getCurrentUser().id;

    let url = new URL('https://notify-bot.line.me/oauth/authorize');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', 'grGEu41KxdJM2XLws6e3PN');
    url.searchParams.append('redirect_uri', environment.lineRedirectUrl);
    url.searchParams.append('scope', 'notify');
    url.searchParams.append('state', userId);
    url.searchParams.append('response_mode', 'form_post');

    location.href = url.href;
  }

  // /**
  //  * 楽天情報の保存確認ダイアログを開く
  //  */
  // openRakuSaveDialog() {
  //   this.utilService
  //     .showSweetConfirm(`楽天API設定を保存します。<br>よろしいですか？`)
  //     .then((res: any) => {
  //       if (res.isConfirmed) {
  //         // 変更を保存する
  //         this.settingService.updateSetting('楽天API設定', {
  //           rakuten: this.rakuForm.getRawValue(),
  //         });
  //       }
  //     });
  // }

  // /**
  //  * 通知設定の保存確認ダイアログを開く
  //  */
  // openNotifySaveDialog() {
  //   this.utilService
  //     .showSweetConfirm(`通知設定を保存します。<br>よろしいですか？`)
  //     .then((res: any) => {
  //       if (res.isConfirmed) {
  //         // 変更を保存する
  //         this.settingService.updateSetting('通知設定', {
  //           notify: this.notifyForm.getRawValue(),
  //         });
  //       }
  //     });
  // }

  /**
   * アマカリ情報の保存確認ダイアログを開く
   */
  openAmakariSaveDialog() {
    this.utilService
      .showSweetConfirm(`アマカリ設定を保存します。<br>よろしいですか？`)
      .then((res: any) => {
        if (res.isConfirmed) {
          // 変更を保存する
          this.settingService.updateSetting('アマカリ設定', {
            amakari: this.amakariForm.getRawValue(),
          });
        }
      });
  }

  // /**
  //  * ショップマスタの保存確認ダイアログを開く
  //  */
  // openShopSaveDialog() {
  //   this.utilService
  //     .showSweetConfirm(`ショップマスタ設定を保存します。<br>よろしいですか？`)
  //     .then((res: any) => {
  //       if (res.isConfirmed) {
  //         // 変更を保存する
  //         this.settingService.updateSetting('ショップマスタ設定', {
  //           shopList: this.shopList,
  //         });
  //       }
  //     });
  // }

  shopList: any = [];
  modalType: string = '';
  modalTitle: string = '';
  modalBtn: string = '';

  /**
   * ショップマスタ編集モーダル表示
   * @param content
   * @param type
   * @param shop
   * @param idx
   */
  openModal(content: any, type: string, shop: any = '', idx: number = 0) {
    this.modalType = type;
    switch (type) {
      case 'add':
        this.modalTitle = 'ショップマスタ追加';
        this.modalBtn = '追加する';
        break;
      case 'edit':
        this.modalTitle = 'ショップマスタ編集';
        this.modalBtn = '変更する';
        break;
      case 'delete':
        this.modalTitle = 'ショップマスタ削除';
        this.modalBtn = '削除する';
        break;
    }
    this.shopName?.setValue(shop.shopName || '');
    this.shopCode?.setValue(shop.shopCode || '');

    this.modalService
      .open(content, {
        centered: true,
        backdrop: 'static',
        keyboard: true,
        size: 'sm',
      })
      .result.then((result) => {
        if (result) {
          if (this.modalType == 'add') {
            this.shopList.push(result);
          } else if (this.modalType == 'edit') {
            shop.shopName = result.shopName;
            shop.shopCode = result.shopCode;
          } else {
            this.shopList.splice(idx, 1);
          }
        }
      });
  }
}
