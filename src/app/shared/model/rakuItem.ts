import { ItemBase } from './itemBase';
import { SummaryBase } from './summaryItem';
import { Util } from '../common/utils';

export class RakuBase extends ItemBase {
  /** 楽天詳細 - ID */
  id: string = '';
  /** 楽天詳細 - アイテムコード */
  itemCode: string = '';
  /** 楽天詳細 - 個別設定 - クーポン値 */
  confCouponVal: number | undefined;
  /** 楽天詳細 - 個別設定 - クーポンタイプ */
  /** 1:値引額  **/
  /** 2:値引率  **/
  confCouponType: number | undefined;

  /** 楽天 - 商品名 */
  rakuName: string = '';
  /** 楽天 - 商品価格 */
  rakuPrice: number = 0;
  /** 楽天 - 商品URL */
  rakuUrl: string = '';
  /** 楽天 - 商品画像URL */
  rakuImageUrl: string = '';
  /** 楽天 - ショップURL */
  rakuShopUrl: string = '';
  /** 楽天 - ショップ名 */
  rakuShopName: string = '';
  /** 楽天 - ランキング */
  rakuRank: number | undefined;
  /** 楽天 - 商品ポイント倍率 */
  rakuPointRate: number = 0;
  /** 楽天 - 個別ポイント倍率適用開始日時 */
  rakuPointRateStartTime: string = '';
  /** 楽天 - 個別ポイント倍率適用終了日時 */
  rakuPointRateEndTime: string = '';
  /** 楽天 - 送料別フラグ */
  /** 0:送料込 */
  /** 1:送料別 */
  rakuPostageFlg: number = 0;
  /** 楽天 - 商品在庫状況 */
  rakuAvailability: number = 0;
  /** 楽天 - JANコード */
  rakuJanCode: string = '';

  /****** 以下画面設定項目 *******/

  /** 適用 - クーポン値 */
  couponVal: number = 0;
  /** 適用 - クーポンタイプ */
  /** true:値引率  **/
  /** false:値引額  **/
  couponType: boolean = false;

  constructor(rakuItem: any, settings: any) {
    super(settings);

    // 初期化処理
    this.init();
    // Rakuten情報を設定
    this.setRakuItem(rakuItem);
    // 画面項目を設定
    this.refreshScreenInfo();
  }

  /**
   * 初期化処理
   * @returns
   */
  public init = () => {
    this.id = '';
    this.itemCode = '';
    this.confCouponVal = undefined;
    this.confCouponType = undefined;

    this.rakuName = '';
    this.rakuPrice = 0;
    this.rakuUrl = '';
    this.rakuImageUrl = '';
    this.rakuShopUrl = '';
    this.rakuShopName = '';
    this.rakuRank = undefined;
    this.rakuPointRate = 0;
    this.rakuPointRateStartTime = '';
    this.rakuPointRateEndTime = '';
    this.rakuPostageFlg = 0;
    this.rakuAvailability = 0;
    this.rakuJanCode = '';

    /****** 以下画面設定項目 *******/
    this.couponVal = 0;
    this.couponType = false;
  };

  /**
   * Rakuten情報を設定
   * @param item
   * @returns
   */
  public setRakuItem = (item: any) => {
    if (item?.id) this.id = item.id;
    if (item?.itemCode) this.itemCode = item.itemCode;
    if (Util.isNumber(item?.confCouponVal))
      this.confCouponVal = item?.confCouponVal as number;
    if (Util.isNumber(item?.confCouponType))
      this.confCouponType = item?.confCouponType as number;
    if (item?.rakuName) this.rakuName = item.rakuName;
    if (item?.rakuPrice) this.rakuPrice = item.rakuPrice;
    if (item?.rakuUrl) this.rakuUrl = item.rakuUrl;
    if (item?.rakuImageUrl) this.rakuImageUrl = item.rakuImageUrl;
    if (item?.rakuShopUrl) this.rakuShopUrl = item.rakuShopUrl;
    if (item?.rakuShopName) this.rakuShopName = item.rakuShopName;
    if (item?.rakuRank) this.rakuRank = item.rakuRank;
    if (item?.rakuPointRate) this.rakuPointRate = item.rakuPointRate;
    if (item?.rakuPointRateStartTime)
      this.rakuPointRateStartTime = item.rakuPointRateStartTime;
    if (item?.rakuPointRateEndTime)
      this.rakuPointRateEndTime = item.rakuPointRateEndTime;
    if (Util.isNumber4str(item?.rakuPostageFlg))
      this.rakuPostageFlg = item.rakuPostageFlg;
    if (item?.rakuAvailability && Number(item?.rakuAvailability))
      this.rakuAvailability = 1;
    if (item?.rakuJanCode) this.rakuJanCode = item.rakuJanCode;
  };

  /**
   * 画面項目を設定
   * @returns
   */
  public refreshScreenInfo = () => {
    // クーポンの初期値
    this.couponVal = this.confCouponVal || 0;
    // クーポンタイプの初期値
    this.couponType =
      this.confCouponType && this.confCouponType == 2 ? true : false;

    const nowDate = new Date();

    // 楽天商品ポイント倍率の設定
    if (this.rakuPointRate) {
      const st = new Date(this.rakuPointRateStartTime);
      const end = new Date(this.rakuPointRateEndTime);

      // 期限切れなら0倍
      if (st > nowDate || end < nowDate) {
        this.rakuPointRate = 0;
      }
    }
  };

  /**
   * クーポン合計計算
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcTotalCoupon = (summary: SummaryBase, singleFlg: boolean) => {
    const orderQuantity = singleFlg ? 1 : summary.orderQuantity;
    // 楽天価格 x 購入数
    const rakuPrice = this.rakuPrice * orderQuantity;

    let coupon: number = 0;

    if (this.couponType) {
      // クーポン値引率
      coupon = Math.floor(rakuPrice * 0.01 * this.couponVal);
    } else {
      // クーポン値引額
      coupon = Math.floor(this.couponVal);
    }

    return coupon;
  };

  /**
   * SPUポイント計算
   * @param summary 商品サマリ
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcSpuPoint(summary: SummaryBase, singleFlg: boolean): number {
    const cashPrice = this.calcCashPrice(summary, singleFlg);
    const spuRatio = this.settings?.rakuten?.spuRatio;

    // 消費税率
    const taxRate = summary.amaItems?.[0]?.reducedTaxFlg ? 0.08 : 0.1;
    const nonTaxedPrice = cashPrice - cashPrice * (taxRate / (1 + taxRate));

    const point = Math.floor(nonTaxedPrice * 0.01 * spuRatio);

    return point;
  }

  /**
   * アイテムポイント計算
   * @param summary 商品サマリ
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcItemPoint(summary: SummaryBase, singleFlg: boolean): number {
    const cashPrice = this.calcCashPrice(summary, singleFlg);
    // 消費税率
    const taxRate = summary.amaItems?.[0]?.reducedTaxFlg ? 0.08 : 0.1;
    const nonTaxedPrice = cashPrice - cashPrice * (taxRate / (1 + taxRate));

    const point = Math.floor(nonTaxedPrice * 0.01 * this.rakuPointRate);

    return point;
  }

  /**
   * 合計ポイント計算
   * @param summary 商品サマリ
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcTotalPoint(
    summary: SummaryBase,
    singleFlg: boolean
  ): number | undefined {
    let point = undefined;

    // SPUポイント
    const spuPoint = this.calcSpuPoint(summary, singleFlg);
    // アイテムポイント
    const itemPoint = this.calcItemPoint(summary, singleFlg);

    if (Util.isNumber4str(spuPoint) && Util.isNumber4str(itemPoint)) {
      // 合計ポイント
      point = (spuPoint as number) + (itemPoint as number);
    }

    return point;
  }

  /**
   * 現金価格計算
   * @param summary 商品サマリ
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcCashPrice(summary: SummaryBase, singleFlg: boolean): number {
    const orderQuantity = singleFlg ? 1 : summary.orderQuantity;
    // 楽天価格 x 購入数
    const rakuPrice = this.rakuPrice * orderQuantity;
    // クーポン合計値
    const totalCoupon = this.calcTotalCoupon(summary, singleFlg);

    // 差引価格
    return rakuPrice - totalCoupon;
  }

  /**
   * 差引価格計算
   * @param summary 商品サマリ
   * @param singleFlg 単品フラグ
   * @returns
   */
  public calcPointPrice(summary: SummaryBase, singleFlg: boolean): number {
    // ポイント合計値
    const totalPoint = this.calcTotalPoint(summary, singleFlg);

    // 差引価格
    return this.calcCashPrice(summary, singleFlg) - (totalPoint as number);
  }
}
