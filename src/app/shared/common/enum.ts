/**
 * モード種別
 *
 * 1：追加
 * 2：編集
 * 3：削除
 * */
export const MODE_TYPE = {
  ADD: 1,
  EDIT: 2,
  DELETE: 3,
} as const;
export type MODE_TYPE = typeof MODE_TYPE[keyof typeof MODE_TYPE];

/**
 * 権限種別
 *
 * 1：一般ユーザ
 * 9：システム管理者
 * */
export const ROLE_TYPE = {
  NONE: 0,
  NORMAL: 1,
  SYS_MNG: 9,
} as const;
export type ROLE_TYPE = typeof ROLE_TYPE[keyof typeof ROLE_TYPE];

/**
 * ECモール種別
 *
 * 1：楽天
 * 2：Amazon
 * 3：Yahoo
 * */
export const EC_TYPE = {
  RAKUTEN: 1,
  AMAZON: 2,
  YAHOO: 3,
} as const;
export type EC_TYPE = typeof EC_TYPE[keyof typeof EC_TYPE];

/**
 * カート種別
 *
 * 0：カート無／出品者無し
 * 1：カート有／Amazon
 * 2：カート有／FBA
 * 3：カート有／FBM
 * 4：カート無／FBA
 * 5：カート無／FBM
 */
export const CART_TYPE = {
  NOTHING: 0,
  AMAZON: 1,
  CART_FBA: 2,
  CART_FBM: 3,
  NO_CART_FBA: 4,
  NO_CART_FBM: 5,
} as const;
export type CART_TYPE = typeof CART_TYPE[keyof typeof CART_TYPE];

/**
 * 手数料種別
 *
 * 1：FBA
 * 2：FBM
 * 3：小型軽量
 * */
export const FEE_TYPE = {
  FBA: 1,
  FBM: 2,
  SMALL: 3,
} as const;
export type FEE_TYPE = typeof FEE_TYPE[keyof typeof FEE_TYPE];
