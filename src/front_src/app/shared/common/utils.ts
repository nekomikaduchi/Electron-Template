import * as _ from 'lodash';

export class Util {
  /**
   * 数値判定（number型のみ判定）
   * @param value
   * @returns
   */
  static isNumber = (value: any): boolean => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 数値判定（string型も判定）
   * @param value
   * @returns
   */
  static isNumber4str = (value: any): boolean => {
    if (typeof value === 'string') {
      if (value) {
        return Util.isNumber(Number(value));
      }
    } else {
      return Util.isNumber(value);
    }
    return false;
  };

  /**
   * ディープコピー
   * @param data
   * @returns
   */
  static deepCopy = (data: any): any => {
    return _.cloneDeep(data);
  };

  /**
   * keyvalue パイプで使用する、key値で昇順ソート
   * @param data
   * @returns
   */
  static keyAscOrder = (a: any, b: any): number => {
    if (Util.isNumber4str(a.key) && Util.isNumber4str(b.key)) {
      return Number(a.key) > Number(b.key) ? 1 : -1;
    } else {
      return a.key > b.key ? 1 : -1;
    }
  };
  /**
   * keyvalue パイプで使用する、value値で昇順ソート
   * @param data
   * @returns
   */
  static valAscOrder = (a: any, b: any): number => {
    if (Util.isNumber4str(a.key) && Util.isNumber4str(b.key)) {
      return Number(a.value) > Number(b.value) ? 1 : -1;
    } else {
      return a.value > b.value ? 1 : -1;
    }
  };

  /**
   * 一定時間待機する
   * @param time 停止時間
   * @returns
   */
  static sleep = async (time: number) => {
    return new Promise((t: any) => setTimeout(() => t(), time));
  };
}
