import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResearchService {
  itemCodeList: string[] = [];

  constructor() {}

  /**
   * 楽天市場ランキングAPIをコール
   * @param rakuAppId 楽天アプリID
   * @param genre ジャンルID
   * @param period 期間
   * @param page ページ
   * @returns
   */
  getRankItem = (
    rakuAppId: string,
    genre: string,
    period: number,
    page: number
  ): Promise<any> => {
    const baseUrl =
      'https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?formatVersion=2';

    let url = `${baseUrl}&applicationId=${rakuAppId}&page=${page}`;

    if (genre) {
      url += `&genreId=${genre}`;
    }
    if (period == 1) {
      url += `&period=realtime`;
    }

    return axios.get(url);
  };

  /**
   * 楽天商品検索APIをコール
   * @param rakuAppId 楽天アプリID
   * @param shopCode ショップコード
   * @param keyword キーワード
   * @param page ページ
   * @returns
   */
  getKeywordItem = (
    rakuAppId: string,
    shopCode: string,
    keyword: string,
    page: number
  ): Promise<any> => {
    const baseUrl =
      'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&formatVersion=2&availability=0&hits=30';

    let url = `${baseUrl}&applicationId=${rakuAppId}&page=${page}`;

    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    if (shopCode) {
      url += `&shopCode=${shopCode}`;
    }

    return axios.get(url);
  };

  // /**
  //  * リサーチ商品一覧を取得
  //  * @returns
  //  */
  // list(): Observable<Item[]> {
  //   return this.fbService.getRtDb4p(`users/#PARENT#/researchItems`).pipe(
  //     map((response: any) => {
  //       if (response) {
  //         return Object.keys(response).map((key: string) => {
  //           return response[key];
  //         });
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }

  // /**
  //  * リサーチ商品を取得
  //  * @param itemCode アイテムコード
  //  * @returns
  //  */
  // getItem(itemCode: string): Observable<any> {
  //   return this.fbService.getRtDb4p(`users/#PARENT#/researchItems/${itemCode}`);
  // }

  // addItem(item: Item): Observable<void> {
  //   // 商品追加日時と情報更新日時を追加
  //   item.addDate = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', this.locale);
  //   item.updateDate = formatDate(
  //     new Date(),
  //     'yyyy/MM/dd HH:mm:ss',
  //     this.locale
  //   );

  //   return this.fbService.updateRtDb4p(
  //     `users/#PARENT#/researchItems/${item.itemCode}`,
  //     item
  //   );
  // }

  // /**
  //  * リサーチ商品情報を更新する
  //  * @param item 更新情報
  //  * @param updFlg 更新日時を更新するかどうか
  //  * @returns
  //  */
  // updateItem(item: any, updFlg: boolean = true): Observable<string> {
  //   if (updFlg) {
  //     // 更新日時を追加
  //     item.updateDate = formatDate(
  //       new Date(),
  //       'yyyy/MM/dd HH:mm:ss',
  //       this.locale
  //     );
  //   }

  //   return this.fbService
  //     .updateRtDb4p(`users/#PARENT#/researchItems/${item.itemCode}`, item)
  //     .pipe(
  //       map((response: any) => {
  //         return item.updateDate;
  //       })
  //     );
  // }

  // deleteItem(itemCode: string): Observable<void> {
  //   return this.fbService.deleteRtDb4p(
  //     `users/#PARENT#/researchItems/${itemCode}`
  //   );
  // }

  // pushLineApi(uidList: string[], form: any): Observable<void> {
  //   return this.fbService.callFireFunc('pushLineApi', {
  //     to: uidList,
  //     kind: form.kind,
  //     url: form.url,
  //     image: form.image,
  //     num: form.num,
  //     address: form.address,
  //     message: form.message,
  //     pointFlg: form.pointFlg,
  //   });
  // }

  // addReqItem(uid: string, item: Item, formData: any): Observable<void> {
  //   // 商品追加日時と情報更新日時を追加
  //   const strDate = formatDate(new Date(), 'yyyyMMddHHmmss', this.locale);

  //   return this.fbService.updateRtDb4p(
  //     `users/#PARENT#/goods/${uid}/${strDate}`,
  //     {
  //       asin: item.asin,
  //       packingSize: item.packingSize,
  //       amaUrl: item.amaUrl,
  //       itemCode: item.itemCode,
  //       addDate: formatDate(new Date(), 'yyyy/MM/dd HH:mm', this.locale),
  //       itemName: item.itemName,
  //       itemSmallImageUrl: item.itemSmallImageUrl,
  //       itemUrl: item.itemUrl,
  //       shopName: item.shopName,
  //       shopUrl: item.shopUrl,
  //       unitPrice: item.itemPrice,
  //       num: formData.num,
  //       address: formData.address,
  //       postage: '',
  //       couponVal: '',
  //       pointVal: '',
  //       actPrice: '',
  //       status: '未購入',
  //     }
  //   );
  // }
}
