import { User } from '../../API.service';
import { ROLE_TYPE } from '../common/enum';

export interface UserEx extends User {}

export class UserBase {
  /** ユーザーID */
  id: string;
  /** ユーザー名(表示用) */
  dispName: string;
  /** メールアドレス */
  mail: string;
  /** ロール */
  role: ROLE_TYPE;
  // /** SP-API連携フラグ */
  // spApiFlg: boolean;
  // /** LINE連携フラグ */
  // lineFlg: boolean;
  // /** Stripe顧客ID */
  // customerId: string;
  // /** Stripe情報 */
  // stripe: any;
  // /** 設定情報 */
  // settings: any;

  constructor(userEx?: UserEx) {
    this.id = userEx?.id || '';
    this.dispName = userEx?.dispName || '';
    this.mail = userEx?.mail || '';
    // @ts-ignore
    this.role = userEx?.role || ROLE_TYPE.NONE;
    // this.spApiFlg = userEx?.spApiFlg || false;
    // this.lineFlg = userEx?.lineFlg || false;
    // this.customerId = userEx?.customerId || '';

    // this.stripe = userEx?.stripe ? JSON.parse(userEx.stripe) : '';

    // this.settings = userEx?.settings
    //   ? {
    //       ...Util.deepCopy(Constant.INIT_SETTING_VAL),
    //       ...JSON.parse(userEx.settings),
    //     }
    //   : Constant.INIT_SETTING_VAL;
  }
}
