import { AmaBase } from './amaItem';
import { ItemBase } from './itemBase';
import { RakuBase } from './rakuItem';

export class SummaryBase extends ItemBase {
  /** サマリ - ID */
  id: string = '';
  /** サマリ - 個別設定 - 楽カウント */
  confRakuCnt: number = 1;
  /** サマリ - 個別設定 - Amaカウント */
  confAmaCnt: number = 1;
  /** サマリ - 個別設定 - 購入数 */
  confOrderQuantity: number = 1;
  /** サマリ - 個別設定 - メモ */
  confMemo: string = '';

  /** 楽天商品 */
  rakuItems: RakuBase[] = [];
  /** Amazon商品 */
  amaItems: AmaBase[] = [];

  /** バージョン番号 */
  _version: number = 0;
  /** 削除フラグ */
  _deleted: boolean = false;
  /** 作成日時 */
  createdAt: string = '';
  /** 更新日時 */
  updatedAt: string = '';

  /** 適用 - 購入数 */
  orderQuantity: number = 1;
  /** 適用 - 楽カウント */
  rakuCnt: number = 1;
  /** 適用 - Amaカウント */
  amaCnt: number = 1;
  /** 適用 - ステータス */
  /** 0:両方とも商品あり    **/
  /** 1:楽天商品なし        **/
  /** 2:Amazon商品なし     **/
  /** 3:両方とも商品なし    **/
  itemStatus: number = 0;

  /** 適用 - エラーフラグ */
  errFlg: boolean = false;

  constructor(summary: any, settings: any) {
    super(settings);

    // 初期化処理
    this.init();
    // サマリ情報を設定
    this.setItemSummary(summary);
  }

  /**
   * 初期化処理
   * @returns
   */
  public init = () => {
    this.id = '';
    this.confRakuCnt = 1;
    this.confAmaCnt = 1;
    this.confOrderQuantity = 1;
    this.confMemo = '';

    this.rakuItems = [];
    this.amaItems = [];

    this.orderQuantity = 1;
    this.rakuCnt = 1;
    this.amaCnt = 1;
    this.itemStatus = 0;

    this.errFlg = false;
  };

  /**
   * サマリ情報を設定
   * @param item
   * @returns
   */
  public setItemSummary = (item: any) => {
    if (item?.id) this.id = item.id;
    if (item?.confRakuCnt) this.confRakuCnt = item.confRakuCnt;
    if (item?.confAmaCnt) this.confAmaCnt = item.confAmaCnt;
    if (item?.confOrderQuantity)
      this.confOrderQuantity = item.confOrderQuantity;
    if (item?.confMemo) this.confMemo = item.confMemo;
    if (item?.amazon) {
      this.amaItems = item.amazon.map(
        (item: any) => new AmaBase(item, this.settings)
      );
    }
    if (item?.rakuten) {
      this.rakuItems = item.rakuten.map(
        (item: any) => new RakuBase(item, this.settings)
      );
    }
    if (item?._version) this._version = item._version;
    if (item?._deleted) this._deleted = item._deleted;
    if (item?.createdAt) this.createdAt = item.createdAt;
    if (item?.updatedAt) this.updatedAt = item.updatedAt;
  };

  /**
   * 画面項目を設定
   * @returns
   */
  public refreshScreenInfo = () => {
    // 購入数の初期値
    this.orderQuantity = this.confOrderQuantity;

    if (this.rakuItems.length == 1 && this.amaItems.length == 1) {
      // 楽カウントの初期値
      this.rakuCnt = this.confRakuCnt;
      // Amaカウントの初期値
      this.amaCnt = this.confAmaCnt;
    }
  };

  /**
   * 1つあたりの利益額（現金）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashProfit = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（現金）= Ama手数料考慮価格 - (1つあたりの仕入額（現金）* Ama数カウント)
    const cashProfit =
      this.getSalesPriceSum4Fee() -
      this.getCashCostPrice(singleFlg) * this.amaCnt;

    return cashProfit;
  };

  /**
   * 1販売あたりの利益額（現金）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashProfitSubTotal = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }
    // 1つあたりの利益額（現金）
    const cashProfit = this.calcCashProfit(singleFlg);
    // 1販売あたりの利益額（現金）= 1つあたりの利益額（現金）* (楽数カウント / Ama数カウント)
    const cashSumProfit = cashProfit * (this.rakuCnt / this.amaCnt);

    return cashSumProfit;
  };

  /**
   * 合計利益額（現金）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashProfitTotal = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 購入数
    const orderQuantity = singleFlg ? 1 : this.orderQuantity;

    // 1販売あたりの利益額（現金）
    const cashSumProfit = this.calcCashProfitSubTotal(singleFlg);
    // 合計利益額（現金）
    const totalCashProfit = Math.round(cashSumProfit * orderQuantity);

    return totalCashProfit;
  };

  /**
   * 利益率（現金）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashProfitRate = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（現金）
    const cashProfit = this.calcCashProfit(singleFlg);
    // 販売予定額の総和
    const salesPrice = this.getSalesPriceSum();

    // 利益率（現金）
    const cashProfitRate = Math.round((cashProfit / salesPrice) * 100);

    return cashProfitRate;
  };

  /**
   * ROI（現金）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashRoi = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（現金）
    const cashProfit = this.calcCashProfit(singleFlg);
    // 仕入額（現金）の総和
    const cashCostPrice = this.getCashCostPrice(singleFlg) * this.rakuCnt;

    // ROI（現金）
    const cashRoi = Math.round((cashProfit / cashCostPrice) * 100);

    return cashRoi;
  };

  /**
   * 1つあたりの利益額（P込）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointProfit = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（P込）= Ama手数料考慮価格 - (1つあたりの仕入額（P込）* Ama数カウント)
    const pointProfit =
      this.getSalesPriceSum4Fee() -
      this.getPointCostPrice(singleFlg) * this.amaCnt;

    return pointProfit;
  };

  /**
   * 1販売あたりの利益額（P込）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointProfitSubTotal = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（P込）
    const pointProfit = this.calcPointProfit(singleFlg);
    // 1販売あたりの利益額（P込）= 1つあたりの利益額（P込）* (楽数カウント / Ama数カウント)
    const pointSumProfit = pointProfit * (this.rakuCnt / this.amaCnt);

    return pointSumProfit;
  };

  /**
   * 合計利益額（P込）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointProfitTotal = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 購入数
    const orderQuantity = singleFlg ? 1 : this.orderQuantity;

    // 1販売あたりの利益額（P込）
    const pointSumProfit = this.calcPointProfitSubTotal(singleFlg);
    // 合計利益額（P込）
    const totalPointProfit = Math.round(pointSumProfit * orderQuantity);

    return totalPointProfit;
  };

  /**
   * 利益率（P込）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointProfitRate = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（P込）
    const pointProfit = this.calcPointProfit(singleFlg);
    // 販売予定額の総和
    const salesPrice = this.getSalesPriceSum();

    // 利益率（P込）
    const pointProfitRate = Math.round((pointProfit / salesPrice) * 100);

    return pointProfitRate;
  };

  /**
   * ROI（P込）取得
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointRoi = (singleFlg: boolean) => {
    // 商品エラーの時
    if (this.itemStatus) {
      return 0;
    }

    // 1つあたりの利益額（P込）
    const pointProfit = this.calcPointProfit(singleFlg);
    // 仕入額（P込）の総和
    const pointCostPrice = this.getPointCostPrice(singleFlg) * this.rakuCnt;
    // ROI（P込）
    const pointRoi = Math.round((pointProfit / pointCostPrice) * 100);

    return pointRoi;
  };

  /**
   * 各Amazon商品の販売予定額の総和を返却
   * @returns
   */
  public getSalesPriceSum = () => {
    return this.amaItems
      .map((amaItem: AmaBase) => amaItem.amaPrice)
      .reduce((sum: number, tmp: number) => sum + tmp, 0);
  };

  /**
   * 各Amazon商品の手数料を考慮した販売予定額の総和を返却
   * @returns
   */
  private getSalesPriceSum4Fee = () => {
    return this.amaItems
      .map((amaItem: AmaBase) => amaItem.amaPrice - amaItem.calcTotalFee())
      .reduce((sum: number, tmp: number) => sum + tmp, 0);
  };

  /**
   * 各楽天商品の1つあたりの仕入額（現金）の総和を返却
   * @param singleFlg 単品フラグ
   * @returns
   */
  public getCashCostPrice = (singleFlg: boolean) => {
    return this.rakuItems
      .map((rakuItem: RakuBase) => {
        const orderQuantity = singleFlg ? 1 : this.orderQuantity;
        // 楽天価格 x 購入数
        const rakuPrice = rakuItem.rakuPrice * orderQuantity;
        // クーポン合計値
        const totalCoupon = rakuItem.calcTotalCoupon(this, singleFlg);
        // 仕入額（現金）
        const rakuCashPrice = rakuPrice - totalCoupon;
        // 1つあたりの仕入額（現金）
        const actRakuCashPrice = rakuCashPrice / orderQuantity / this.rakuCnt;

        return actRakuCashPrice;
      })
      .reduce((sum: number, tmp: number) => sum + tmp, 0);
  };

  /**
   * 各楽天商品の1つあたりの仕入額（P込）の総和を返却
   * @param singleFlg 単品フラグ
   * @returns
   */
  public getPointCostPrice = (singleFlg: boolean) => {
    return this.rakuItems
      .map((rakuItem: RakuBase) => {
        const orderQuantity = singleFlg ? 1 : this.orderQuantity;
        // 楽天価格 x 購入数
        const rakuPrice = rakuItem.rakuPrice * orderQuantity;
        // クーポン合計値
        const totalCoupon = rakuItem.calcTotalCoupon(this, singleFlg);
        // ポイント合計値
        const totalPoint = rakuItem.calcTotalPoint(this, singleFlg);
        // 仕入額（P込）
        const rakuPointPrice = rakuPrice - totalCoupon - (totalPoint as number);
        // 1つあたりの仕入額（P込）
        const actRakuPointPrice = rakuPointPrice / orderQuantity / this.rakuCnt;

        return actRakuPointPrice;
      })
      .reduce((sum: number, tmp: number) => sum + tmp, 0);
  };

  /**
   * RakuKariItem登録用のデータを返却する
   */
  public getRakuKariItem = () => {
    const rakuItem = this.rakuItems[0];
    const amaItem = this.amaItems[0];

    if (rakuItem && amaItem) {
      return {
        itemCode: rakuItem.itemCode,
        janCode: rakuItem.rakuJanCode,
        confCouponVal: rakuItem.confCouponVal,
        confCouponType: rakuItem.confCouponType,
        confAmaPrice: amaItem.confAmaPrice,
        rakuName: rakuItem.rakuName,
        rakuPrice: rakuItem.rakuPrice,
        rakuUrl: rakuItem.rakuUrl,
        rakuImageUrl: rakuItem.rakuImageUrl,
        rakuShopUrl: rakuItem.rakuShopUrl,
        rakuShopName: rakuItem.rakuShopName,
        rakuPointRate: rakuItem.rakuPointRate,
        rakuPointRateStartTime: rakuItem.rakuPointRateStartTime,
        rakuPointRateEndTime: rakuItem.rakuPointRateEndTime,
        rakuPostageFlg: rakuItem.rakuPostageFlg,
        rakuAvailability: rakuItem.rakuAvailability,
        asin: amaItem.asin,
        amaName: amaItem.amaName,
        amaImageUrl: amaItem.amaImageUrl,
        amaListingPrice: amaItem.amaListingPrice,
        amaShipping: amaItem.amaShipping,
        amaPoint: amaItem.amaPoint,
        amaRank: amaItem.amaRank,
        categoryId: amaItem.categoryId,
        size: amaItem.size,
        packageSize: amaItem.packageSize,
        isFbaFee: amaItem.isFbaFee,
        amaFbaFee: amaItem.amaFbaFee,
        amaSalesFee: amaItem.amaSalesFee,
        amaStockFee: amaItem.amaStockFee,
        cartType: amaItem.cartType,
        sellerNew: amaItem.sellerNew,
        sellerUsed: amaItem.sellerUsed,
        reducedTaxFlg: amaItem.reducedTaxFlg,
      };
    }

    return undefined;
  };
}
