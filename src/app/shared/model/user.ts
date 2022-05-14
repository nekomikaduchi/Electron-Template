import { User } from '../../API.service';
import { Constant } from '../common/constant';
import { ROLE_TYPE } from '../common/enum';
import { Util } from '../common/utils';

export interface UserEx extends User {
  /*************
   * DB項目
   *************/
  /** テーブル名 */
  // __typename: 'User';
  /** ユーザーID */
  // id: string;
  /** ユーザー名(表示用) */
  // dispName: string;
  /** メールアドレス */
  // mail: string;
  /** ロール */
  // role: number;
  /** SP-API連携フラグ */
  // spApiFlg: boolean;
  /** LINE連携フラグ */
  // lineFlg: boolean;
  /** Stripe顧客ID */
  // customerId: string | null;
  /** Stripe情報 */
  // stripe: any;
  /** 認証情報 */
  // secret?: string | null;
  /** 設定情報 */
  // settings?: string | null;
  /** 作成日時 */
  // createdAt: string;
  /** 更新日時 */
  // updatedAt: string;
  /** バージョン */
  // _version: number;
  /** 削除フラグ */
  // _deleted?: boolean | null;
  /** 最終更新日時（Amplify用） */
  // _lastChangedAt: number;
}

export class UserBase {
  /** ユーザーID */
  id: string;
  /** ユーザー名(表示用) */
  dispName: string;
  /** メールアドレス */
  mail: string;
  /** ロール */
  role: ROLE_TYPE;
  /** SP-API連携フラグ */
  spApiFlg: boolean;
  /** LINE連携フラグ */
  lineFlg: boolean;
  /** Stripe顧客ID */
  customerId: string;
  /** Stripe情報 */
  stripe: any;
  /** 設定情報 */
  settings: any;
  /** バージョン */
  version: number;

  constructor(userEx?: UserEx) {
    this.id = userEx?.id || '';
    this.dispName = userEx?.dispName || '';
    this.mail = userEx?.mail || '';
    // @ts-ignore
    this.role = userEx?.role || ROLE_TYPE.NONE;
    this.spApiFlg = userEx?.spApiFlg || false;
    this.lineFlg = userEx?.lineFlg || false;
    this.customerId = userEx?.customerId || '';
    this.version = userEx?._version || 0;

    this.stripe = userEx?.stripe ? JSON.parse(userEx.stripe) : '';

    this.settings = userEx?.settings
      ? {
          ...Util.deepCopy(Constant.INIT_SETTING_VAL),
          ...JSON.parse(userEx.settings),
        }
      : Constant.INIT_SETTING_VAL;
  }
}
