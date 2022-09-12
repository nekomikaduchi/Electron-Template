// electron-storeモジュール読み込み
const Store = require('electron-store');
const store = new Store();

/**
 * config.jsonにデータを保存する
 * @param {string} key キー
 * @param {object} value 値
 */
exports.saveConfig = async (key: string, value: any) => {
  try {
    // 保存
    store.set(key, value);
    return '';
  } catch (error) {
    return error;
  }
};

/**
 * config.jsonからデータを取得する
 * @param {string} key キー
 */
exports.getConfig = async (key: string) => {
  try {
    // 取得
    return store.get(key);
  } catch (error) {
    return error;
  }
};

/**
 * config.jsonからデータを削除する
 * @param {string} key キー
 */
exports.deleteConfig = async (key: string) => {
  try {
    // 削除
    return store.delete(key);
  } catch (error) {
    return error;
  }
};

/**
 * itemsのステータスをすべてリセットする
 */
exports.resetItemStatus = async () => {
  try {
    let items = store.get('items');

    Object.keys(items).map((itemCode) => {
      const key = 'items.' + itemCode + '.status';
      store.set(key, '0');
    });

    let reserveItems = store.get('reserveItems');

    Object.keys(reserveItems).map((itemCode) => {
      const key = 'reserveItems.' + itemCode + '.status';
      store.set(key, '0');
    });

    return '';
  } catch (error) {
    return error;
  }
};
