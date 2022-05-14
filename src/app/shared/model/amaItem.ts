import { ItemBase } from './itemBase';
import { Util } from '../common/utils';

export class AmaBase extends ItemBase {
  /** Amazon詳細 - ID */
  id: string = '';
  /** Amazon詳細 - ASIN */
  asin: string = '';
  /** Amazon詳細 - 個別設定 - Amazon価格 */
  confAmaPrice: number | undefined;
  /** Amazon詳細 - 個別設定 - Amazon販売手数料 */
  confSalesFee: number | undefined;
  /** Amazon詳細 - 個別設定 - 通知価格 */
  confLimitPrice: number | undefined;
  /** 監視フラグ */
  watchFlg: boolean = false;

  /** Amazon - 商品名 */
  amaName: string = '';
  /** Amazon - 商品画像URL */
  amaImageUrl: string = '';
  /** Amazon - 商品表示価格 */
  amaListingPrice: number = 0;
  /** Amazon - 商品送料 */
  amaShipping: number = 0;
  /** Amazon - 商品ポイント */
  amaPoint: number = 0;
  /** Amazon - 前回の商品表示価格 */
  lastListingPrice: number | undefined;
  /** Amazon - 前回の商品送料 */
  lastShipping: number | undefined;
  /** Amazon - 前回の商品ポイント */
  lastPoint: number | undefined;
  /** Amazon - 商品ランキング */
  amaRank: number = 0;
  /** Amazon - 商品サイズ */
  size: string = 'unknown';
  /** Amazon - 商品サイズ(width,height,length,weight) */
  packageSize: string | undefined;
  /** Amazon - 手数料区分 （FBA or 自己発送）*/
  /** true:FBA */
  /** false:FBM */
  isFbaFee: boolean = false;
  /** Amazon - FBA手数料 */
  amaFbaFee: number | undefined;
  /** Amazon - 販売手数料 */
  amaSalesFee: number | undefined;
  /** Amazon - 在庫保管手数料 */
  amaStockFee: number | undefined;
  /** カート種別              **/
  /** 0:カート無し＆出品者なし **/
  /** 1:Amazon               **/
  /** 2:カート有り＆FBA       **/
  /** 3:カート有り＆自己発送   **/
  /** 4:カート無し＆FBA       **/
  /** 5:カート無し＆自己発送   **/
  cartType: number = 0;
  /** Amazon - 新品販売数 */
  sellerNew: number = 0;
  /** Amazon - 中古販売数 */
  sellerUsed: number = 0;
  /** Amazon - カテゴリID */
  categoryId: string = '';
  /** 軽減税率フラグ */
  reducedTaxFlg: number | undefined;

  /** Amazon - 商品価格(ポイント、送料込) */
  amaPrice: number = 0;
  /** Amazon - 前回の商品価格(ポイント、送料込) */
  lastAmaPrice: number | undefined;
  /** 価格差 */
  profitDiff: number | undefined;
  /** 価格差率 */
  profitDiffRate: number | undefined;

  /****** 以下画面設定項目 *******/

  /** Amazon - 商品URL */
  amaUrl: string = '';
  /** Amazon - 出品者一覧URL(新品) */
  amaOfferNewUrl: string = '';
  /** Amazon - 出品者一覧URL(中古) */
  amaOfferUsedUrl: string = '';
  /** KeepaURL */
  keepaUrl: string = '';
  /** KeepaグラフURL */
  keepaGraphUrl: string = '';

  /** 適用 - Parse後のpackageSize */
  parsePackageSize: any;
  /** 小型軽量プログラムの適用状態 */
  smallProgFlg: number = 0;

  /** 手数料タイプ */
  feeType: number = 1;
  /** Amazon販売手数料 */
  salesFee: number | undefined;

  constructor(amaItem: any, settings: any) {
    super(settings);

    // 初期化処理
    this.init();
    // Amazon情報を設定
    this.setAmaItem(amaItem);
    // 画面項目を設定
    this.refreshScreenInfo();
  }

  /**
   * 初期化処理
   * @returns
   */
  public init = () => {
    this.id = '';
    this.asin = '';
    this.confAmaPrice = undefined;
    this.confSalesFee = undefined;
    this.confLimitPrice = undefined;
    this.watchFlg = false;

    this.amaName = '';
    this.amaImageUrl = '';
    this.amaListingPrice = 0;
    this.amaShipping = 0;
    this.amaPoint = 0;
    this.lastListingPrice = undefined;
    this.lastShipping = undefined;
    this.lastPoint = undefined;
    this.amaRank = 0;
    this.size = 'unknown';
    this.packageSize = undefined;
    this.isFbaFee = false;
    this.amaFbaFee = undefined;
    this.amaSalesFee = undefined;
    this.amaStockFee = undefined;
    this.cartType = 0;
    this.sellerNew = 0;
    this.sellerUsed = 0;

    this.amaPrice = 0;
    this.lastAmaPrice = undefined;
    this.profitDiff = undefined;
    this.profitDiffRate = undefined;

    /****** 以下画面設定項目 *******/
    this.amaUrl = '';
    this.amaOfferNewUrl = '';
    this.amaOfferUsedUrl = '';
    this.keepaUrl = '';
    this.keepaGraphUrl = '';
    this.parsePackageSize = undefined;

    this.salesFee = undefined;
  };

  /**
   * Amazon情報を設定
   * @param item
   * @returns
   */
  public setAmaItem = (item: any) => {
    if (item?.id) this.id = item.id;
    if (item?.asin) this.asin = item.asin;
    if (Util.isNumber4str(item?.confAmaPrice))
      this.confAmaPrice = item?.confAmaPrice as number;
    if (Util.isNumber4str(item?.confSalesFee))
      this.confSalesFee = item?.confSalesFee as number;
    if (Util.isNumber4str(item?.confLimitPrice))
      this.confLimitPrice = item?.confLimitPrice as number;
    if (item?.watchFlg) this.watchFlg = item.watchFlg;
    if (item?.asin) this.asin = item.asin;
    if (item?.amaName) this.amaName = item.amaName;
    if (item?.amaImageUrl) this.amaImageUrl = item.amaImageUrl;
    if (item?.amaListingPrice)
      this.amaListingPrice = Number(item.amaListingPrice);
    if (item?.amaShipping) this.amaShipping = Number(item.amaShipping);
    if (item?.amaPoint) this.amaPoint = Number(item.amaPoint);
    if (Util.isNumber4str(item?.lastListingPrice))
      this.lastListingPrice = item.lastListingPrice;
    if (Util.isNumber4str(item?.lastShipping))
      this.lastShipping = item.lastShipping;
    if (Util.isNumber4str(item?.lastPoint)) this.lastPoint = item.lastPoint;
    if (item?.amaRank) this.amaRank = Number(item.amaRank);
    if (item?.size) this.size = item.size;
    if (item?.packageSize) this.packageSize = item.packageSize;
    if (item?.isFbaFee) this.isFbaFee = true;
    if (item?.amaFbaFee && Util.isNumber4str(Number(item?.amaFbaFee)))
      this.amaFbaFee = Number(item.amaFbaFee);
    if (item?.amaSalesFee && Util.isNumber4str(Number(item?.amaSalesFee)))
      this.amaSalesFee = Number(item.amaSalesFee);
    if (item?.amaStockFee && Util.isNumber4str(Number(item?.amaStockFee)))
      this.amaStockFee = Number(item.amaStockFee);
    if (item?.cartType && Util.isNumber4str(Number(item?.cartType)))
      this.cartType = Number(item.cartType);
    if (item?.sellerNew) this.sellerNew = Number(item.sellerNew);
    if (item?.sellerUsed) this.sellerUsed = Number(item.sellerUsed);
    if (item?.categoryId) this.categoryId = item.categoryId;
    if (Util.isNumber4str(item?.reducedTaxFlg))
      this.reducedTaxFlg = item.reducedTaxFlg;

    // Amazon - 商品価格(ポイント、送料込)
    this.amaPrice = this.amaListingPrice + this.amaShipping - this.amaPoint;

    if (
      Util.isNumber4str(this.lastListingPrice) &&
      Util.isNumber4str(this.lastShipping) &&
      Util.isNumber4str(this.lastPoint)
    ) {
      // Amazon - 前回の商品価格(ポイント、送料込)
      this.lastAmaPrice =
        (this.lastListingPrice as number) +
        (this.lastShipping as number) -
        (this.lastPoint as number);

      // 前回の商品価格 - 商品価格
      this.profitDiff = this.lastAmaPrice - this.amaPrice;
      this.profitDiffRate = this.profitDiff / this.lastAmaPrice;
    }

    // 適用 - Parse後のpackageSize
    this.parsePackageSize = this.packageSize
      ? JSON.parse(this.packageSize)
      : undefined;
  };

  /**
   * 画面項目を設定
   */
  public refreshScreenInfo = () => {
    // Amazon - 商品URL
    this.amaUrl = `https://www.amazon.co.jp/dp/${this.asin}`;
    // Amazon - 出品者一覧URL(新品)
    this.amaOfferNewUrl = `https://www.amazon.co.jp/gp/offer-listing/${this.asin}?f_new=true`;
    // Amazon - 出品者一覧URL(中古)
    this.amaOfferUsedUrl = `https://www.amazon.co.jp/gp/offer-listing/${this.asin}?f_used=true`;
    // KeepaURL
    this.keepaUrl = `https://keepa.com/#!product/5-${this.asin}`;
    // KeepaグラフURL
    this.keepaGraphUrl = `https://graph.keepa.com/pricehistory.png?asin=${this.asin}&domain=co.jp&salesrank=1&amazon=1&new=1&used=1&cAmazon=ff0000&cNew=0000ff&cUsed=00ff00&cFont=333333&cBackground=ffffff&range=31`;
  };

  /**
   * Amazon販売手数料(消費税込み)の取得
   * @returns
   */
  public getSalesFeeTax = () => {
    // 販売手数料に消費税を加算
    return Math.floor(Number(this.salesFee) * 1.1);
  };

  /**
   * 手数料計算
   * @returns
   */
  public calcTotalFee(): number {
    let totalFee: number = 0;

    if (this.settings?.display?.feeCalc) {
      const salesFeeTax = Number(this.getSalesFeeTax());
      const amaStockFee = Number(this.amaStockFee);
      const amaFbaFee = Number(this.amaFbaFee);
      const size = this.size;

      switch (this.feeType) {
        case 1:
          totalFee = salesFeeTax + amaStockFee + amaFbaFee;
          break;
        case 2:
          totalFee = salesFeeTax + this.settings?.selfShipping?.[size];
          break;
        case 3:
          let smallFee =
            this.amaPrice <= 1000 && (size == 's1' || size == 'n1') ? 193 : 205;
          totalFee = salesFeeTax + amaStockFee + smallFee;
          break;
      }
    }

    return totalFee;
  }
}
