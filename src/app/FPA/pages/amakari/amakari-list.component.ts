import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { FilterDetailDialogComponent } from './dialog/filter-detail/filter-detail-dialog.component';
import { AddAsinDialogComponent } from './dialog/add-asin/add-asin-dialog.component';

import { AuthService } from 'src/app/shared/service/auth.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { CustomApiService } from 'src/app/shared/service/customApi.service';

import { Constant } from 'src/app/shared/common/constant';
import { SummaryBase } from 'src/app/shared/model/summaryItem';
import { Util } from 'src/app/shared/common/utils';

import { UserBase } from 'src/app/shared/model/user';

interface AmakariItem {
  id: string;
  updateDate: string;
  addDate: string;
  amaUrl: string;
  amaImageUrl: string;
  keepaUrl: string;
  keepaGraphUrl: string;
  asin: string;
  amaName: string;
  nowPrice: string;
  lastPrice: string;
  amaSalesFee: string;
  amaFbaFee: string;
  profitDiff: number | undefined;
  profitDiffRate: string;
  limitPrice: number | undefined;
  watchFlg: boolean;
  amaRank: string;
  categoryId: string;
  amaSize: string;
  _version: number;
}

@Component({
  selector: 'app-amakari-list',
  templateUrl: './amakari-list.component.html',
  styleUrls: ['./amakari-list.component.scss'],
})
export class AmaKariListComponent implements OnInit, OnDestroy, AfterViewInit {
  util = Util;

  currentUser!: UserBase;

  // 列名マップ
  columnMap = Constant.COLUMN_AMAKARI_MAP;
  // サイズマップ
  sizeMap = Constant.SIZE_MAP;
  // カテゴリマップ
  categoryMap = Constant.CATEGORY_MAP;

  items: AmakariItem[] = [];
  // 列情報
  columns: any = [];

  /** ページング関連 */
  itemCount: number = 0;
  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 30, 50];
  pageAry: number[] = [];

  selectionRow = new SelectionModel<AmakariItem>(true, []);

  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  actionNum: string = '0';
  /** サイズ種別マップ */
  actionMap: { [s: string]: string } = {
    '0': 'アクション選択',
    '1': '一括監視開始',
    '2': '一括監視解除',
    '3': '一括削除',
  };

  constructor(
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
    private utilService: UtilService,
    private apiService: CustomApiService,
    private toastr: ToastrService
  ) {
    // 同じrouteを選択した時にリロードされるようにする設定
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // 列定義を設定
    this.columns = this.authService.getCurrentUser().settings.column.amakari;

    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    // 検索
    this.search();
  }

  scrollEvent!: Subscription;
  fabVisible: boolean = false;

  ngAfterViewInit() {
    // スクロールイベントを追加
    this.scrollEvent = fromEvent(document, 'scroll').subscribe((e: any) => {
      const { clientHeight, offsetHeight, scrollTop, scrollHeight } =
        e.target?.scrollingElement;
      if (scrollTop < 200 || clientHeight + scrollTop > scrollHeight - 200) {
        this.fabVisible = false;
      } else {
        this.fabVisible = true;
      }
    });
  }

  ngOnDestroy() {
    // スクロールイベントの購読解除
    this.scrollEvent.unsubscribe();
  }

  /**
   * 検索処理
   * @param resetFlg ページリセットフラグ
   */
  private search = async (resetFlg: boolean = false) => {
    const status = this.authService.getCurrentUser().stripe?.status;

    if (status != 'trialing' && status != 'active') {
      return;
    }

    // ローディングダイアログ表示
    this.utilService.openLoading();

    let nextToken: any = undefined;
    let items: any = [];
    this.selectionRow.clear();
    if (resetFlg) {
      this.page = 1;
    }

    let filter = undefined;
    // 検索ワード
    let sText = this.searchForm.get('searchText')?.value;

    if (sText) {
      filter = {
        or: [{ asin: { contains: sText } }, { amaName: { contains: sText } }],
      };
    }

    const userId = this.authService.getCurrentUser().id;
    const settings = this.authService.getCurrentUser().settings;

    // while (true) {
    //   const response: any = await this.apiService.AmaKariByUserId(
    //     userId,
    //     undefined,
    //     filter,
    //     1500,
    //     nextToken
    //   );

    //   items = items.concat(
    //     response.items
    //       .filter((item: any) => !item._deleted)
    //       .map(
    //         (item: any) =>
    //           new SummaryBase(
    //             {
    //               ...item,
    //               amazon: [item],
    //               rakuten: [item],
    //             },
    //             settings
    //           )
    //       )
    //   );

    //   // nextToken
    //   nextToken = response.nextToken;

    //   if (!nextToken) {
    //     break;
    //   }
    // }

    // items = items.filter((item: SummaryBase) => {
    //   const watchType = settings.amakariFilter.watchType;
    //   const notifyType = settings.amakariFilter.notifyType;

    //   const watchFlg = item.amaItems[0].watchFlg;
    //   const limitPriceFlg = Util.isNumber4str(item.amaItems[0].confLimitPrice);

    //   if (watchType == 2 && !watchFlg) {
    //     return false;
    //   } else if (watchType == 3 && watchFlg) {
    //     return false;
    //   }

    //   if (notifyType == 2 && !limitPriceFlg) {
    //     return false;
    //   } else if (notifyType == 3 && limitPriceFlg) {
    //     return false;
    //   }

    //   return true;
    // });

    // // 追加日時でソート
    // items.sort((a: SummaryBase, b: SummaryBase) =>
    //   a.createdAt < b.createdAt ? 1 : -1
    // );

    this.items = this.formatData(items);

    // 総件数
    this.itemCount = this.items.length;
    this.pageAry = [...Array(Math.ceil(this.itemCount / this.pageSize))].map(
      (_, i) => i + 1
    );

    this.utilService.closeLoading();
  };

  /**
   * ページトップへスクロール移動
   */
  public moveScrollTop() {
    window.scrollTo(0, 0);
  }

  /**
   * データを整形する
   * @param items 商品情報
   */
  private formatData = (items: SummaryBase[]) => {
    return items.map((item: SummaryBase) => {
      const {
        asin,
        confLimitPrice,
        watchFlg,
        amaName,
        amaUrl,
        amaImageUrl,
        keepaUrl,
        keepaGraphUrl,
        amaPrice,
        lastAmaPrice,
        profitDiff,
        profitDiffRate,
        amaSalesFee,
        amaFbaFee,
        amaRank,
        cartType,
        categoryId,
        size,
      } = item.amaItems?.[0];

      return {
        id: item.id,
        updateDate: item.updatedAt,
        addDate: item.createdAt,
        amaUrl: amaUrl,
        amaImageUrl: amaImageUrl,
        keepaUrl: keepaUrl,
        keepaGraphUrl: keepaGraphUrl,
        asin: asin,
        amaName: amaName,
        nowPrice:
          Util.isNumber4str(amaPrice) && cartType
            ? `￥${amaPrice.toLocaleString()}`
            : `-`,
        lastPrice:
          Util.isNumber4str(lastAmaPrice) && cartType
            ? `￥${(lastAmaPrice as number).toLocaleString()}`
            : `-`,
        amaSalesFee:
          Util.isNumber4str(amaSalesFee) && cartType
            ? `￥${(amaSalesFee as number).toLocaleString()}`
            : `-`,
        amaFbaFee:
          Util.isNumber4str(amaFbaFee) && cartType
            ? `￥${(amaFbaFee as number).toLocaleString()}`
            : `-`,
        profitDiff:
          Util.isNumber4str(profitDiff) && cartType
            ? (profitDiff as number)
            : undefined,
        profitDiffRate:
          Util.isNumber4str(profitDiffRate) && cartType
            ? `${((profitDiffRate as number) * 100)
                .toFixed(1)
                .toLocaleString()} %`
            : `-`,
        limitPrice: confLimitPrice,
        watchFlg: watchFlg,
        amaRank: Util.isNumber4str(amaRank)
          ? `${amaRank.toLocaleString()} 位`
          : `- 位`,
        categoryId: categoryId,
        amaSize: size,
        _version: item._version,
      };
    });
  };

  /**
   * Amazonページを開く
   */
  public goAmazon = (url: string) => {
    window.open(url);
  };

  /** すべて選択されているかどうか判定 */
  public isAllSelected() {
    const numSelected = this.selectionRow.selected.length;
    const numRows = this.items?.length;
    return numSelected === numRows;
  }

  /** 全選択、又は、全クリア */
  public masterToggle() {
    this.isAllSelected()
      ? this.selectionRow.clear()
      : this.items?.forEach((row: any) => this.selectionRow.select(row));
  }

  /**
   * ASINコピーアイコンクリック時に発火
   * @param tooltip ToolTipオブジェクト
   * @param message メッセージ
   */
  public toggleWithMessage = (tooltip: any, message: string) => {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ message });
      setTimeout(() => {
        tooltip.close();
      }, 1500);
    }
  };

  /**
   * 検索ボタン押下時
   */
  public clickedSearchBtn = () => {
    this.search(true);
  };

  /**
   * 詳細フィルターボタン押下時
   */
  public clickedFilterBtn = () => {
    this.modal
      .open(FilterDetailDialogComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: true,
        size: 'sm',
        scrollable: true,
      })
      .result.then((result) => {
        if (result == 'OK') {
          this.search();
        }
      });
  };

  /**
   * ASIN取込ボタン押下時
   */
  public clickedAddAsinBtn = () => {
    if (this.itemCount >= 200) {
      this.utilService.showSweetWarning(`200件以上は登録できません。`);
      return;
    }

    this.modal
      .open(AddAsinDialogComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: true,
        size: 'sm',
        scrollable: true,
      })
      .result.then((result) => {
        if (result == 'OK') {
          this.search();
        }
      });
  };

  /**
   * アクション実行ボタン押下時
   */
  public execAction = () => {
    switch (Number(this.actionNum)) {
      case 1:
        this.bulkChangeWatchFlg(true);
        break;
      case 2:
        this.bulkChangeWatchFlg(false);
        break;
      case 3:
        this.bulkDeleteItem();
        break;
    }
  };

  /**
   * 一括監視フラグ変更
   */
  private bulkChangeWatchFlg = (bool: boolean) => {
    this.utilService
      .showSweetConfirm(
        `選択されたアイテムの監視を一括${
          bool ? '開始' : '解除'
        }します。<br>よろしいですか？`
      )
      .then(async (res: any) => {
        if (res.isConfirmed) {
          const selectedAry = this.selectionRow.selected;

          this.utilService.openLoading();

          for (let i = 0; i < selectedAry.length; i++) {
            const selected = selectedAry[i];
            if (selected.watchFlg != bool) {
              // 監視フラグ変更
              await this._changeWatchFlg(selected, bool);
            }
          }

          this.utilService.closeLoading();
        }
      });
  };

  /**
   * 一括商品削除
   */
  public bulkDeleteItem = () => {
    this.utilService
      .showSweetConfirm(
        `選択されたアイテムを一括削除します。<br>よろしいですか？`
      )
      .then(async (res: any) => {
        if (res.isConfirmed) {
          const selectedAry = this.selectionRow.selected;
          this.utilService.openLoading();

          for (let i = 0; i < selectedAry.length; i++) {
            const selected = selectedAry[i];
            // 商品削除
            await this.deleteItem(selected);
          }

          this.utilService.closeLoading();

          this.page = 1;
          this.search();
        }
      });
  };

  /**
   * 監視フラグ変更時に発火
   * @param aItem
   * @param event
   */
  public changeWatchFlg = async (aItem: AmakariItem, event: any) => {
    this.utilService.openLoading();

    // 監視フラグ変更
    await this._changeWatchFlg(aItem, event.target.checked);

    this.utilService.closeLoading();
  };

  /**
   * 監視フラグ変更
   * @param aItem
   * @param event
   */
  private _changeWatchFlg = async (aItem: AmakariItem, bool: boolean) => {
    // try {
    //   const item = await this.apiService.GetAmaKariItem(aItem.id);
    //   // バージョンを取得
    //   const version = item._version;
    //   // 監視フラグを更新
    //   await this.apiService.UpdateAmaKariItem({
    //     id: item.id,
    //     watchFlg: bool,
    //     _version: version,
    //   });
    //   aItem.watchFlg = bool;
    // } catch (error) {
    //   console.log(error);
    //   this.utilService.showSweetError(`エラーが発生しました`);
    // }
  };

  /**
   * 通知価格変更時に発火
   * @param aItem
   */
  public changeLimitPrice = async (aItem: AmakariItem) => {
    this.utilService.openLoading();

    await this._changeLimitPrice(aItem);

    this.utilService.closeLoading();
  };

  /**
   * 通知価格変更
   * @param aItem
   */
  private _changeLimitPrice = async (aItem: AmakariItem) => {
    // try {
    //   const item = await this.apiService.GetAmaKariItem(aItem.id);
    //   // バージョンを取得
    //   const version = item._version;
    //   // 通知価格を更新
    //   await this.apiService.UpdateAmaKariItem({
    //     id: item.id,
    //     confLimitPrice: aItem.limitPrice,
    //     _version: version,
    //   });
    //   this.toastr.success('', '通知価格を変更しました', {
    //     timeOut: 7500,
    //     closeButton: false,
    //     tapToDismiss: false,
    //     toastClass: 'ngx-toastr alert alert-dismissible alert-success',
    //   });
    // } catch (error) {
    //   console.log(error);
    //   this.utilService.showSweetError(`エラーが発生しました`);
    // }
  };

  /**
   * 削除確認ダイアログ
   * @param item 削除対象アイテム
   * @returns
   */
  public openDeleteItemDialog = async (item: AmakariItem) => {
    const res: any = await this.utilService.showSweetConfirm(
      '商品を削除します。<br>よろしいですか？'
    );
    if (!res.isConfirmed) {
      return;
    }

    // ローディングダイアログ表示
    this.utilService.openLoading();
    // 商品削除
    const success = await this.deleteItem(item);

    this.utilService.closeLoading();

    if (success) {
      this.page = 1;
      this.search();
    }
  };

  /**
   * 商品削除
   */
  private deleteItem = async (aitem: AmakariItem): Promise<boolean> => {
    // try {
    //   const item = await this.apiService.GetAmaKariItem(aitem.id);
    //   // バージョンを取得
    //   const version = item._version;
    //   // 商品削除
    //   await this.apiService.DeleteAmaKariItem({
    //     id: item.id,
    //     _version: version,
    //   });
    //   this.toastr.success('', '商品を削除しました', {
    //     timeOut: 7500,
    //     closeButton: false,
    //     tapToDismiss: false,
    //     toastClass: 'ngx-toastr alert alert-dismissible alert-success',
    //   });
    //   return true;
    // } catch (error) {
    //   console.log(error);
    //   this.utilService.showSweetError(`エラーが発生しました。`);
    //   return false;
    // }
    return true;
  };
}
