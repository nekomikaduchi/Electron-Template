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
