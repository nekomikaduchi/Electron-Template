// const fs = require('fs');
// const csv = require('csv');

// /**
//  * log取得（info）
//  */
// exports.getLog = async () => {
//   const fileName = 'info.txt';
//   const filePath = 'log/info/' + fileName;
//   try {
//     if (isExist(filePath)) {
//       const rawData = fs.readFileSync(filePath);
//       return await getCsv(rawData);
//     } else {
//       return [];
//     }
//   } catch (error) {
//     // electron-logモジュール読み込み
//     const eLog = require('electron-log');
//     eLog.error(process.pid, error);
//     return error;
//   }
// };

// /**
//  * log出力（info）
//  * @param {string} eventName イベント名
//  * @param {object} item 商品情報
//  */
// exports.info = async (eventName: string, item: any) => {
//   const timeString = getNowTimeString();
//   const fileName = 'info.txt';
//   const filePath = 'log/info/' + fileName;

//   const csvStr = await createCsv([
//     Object.assign(
//       {
//         eventDate: timeString,
//         eventName: eventName,
//       },
//       item
//     ),
//   ]);

//   try {
//     if (isExist(filePath)) {
//       fs.appendFileSync(filePath, csvStr);
//     } else {
//       fs.writeFileSync(filePath, csvStr);
//     }
//   } catch (error) {
//     // electron-logモジュール読み込み
//     const eLog = require('electron-log');
//     eLog.error(process.pid, error);
//     return error;
//   }
// };

// /**
//  * log出力（error）
//  * @param {string} key キー
//  */
// exports.error = async (key: string) => {
//   try {
//     // 取得
//     return store.get(key);
//   } catch (error) {
//     return error;
//   }
// };

// /**
//  * 指定されたファイルパスにファイルが存在するかチェック
//  * @param filePath ファイルパス
//  * @returns 存在真偽
//  */
// const isExist = (filePath: string) => {
//   var isExist = false;
//   try {
//     fs.statSync(filePath);
//     isExist = true;
//   } catch (err) {
//     isExist = false;
//   }
//   return isExist;
// };

// /**
//  * [yyyy/MM/dd HH:mm:ss]書式の現在時刻を取得する
//  */
// const getNowTimeString = () => {
//   const dt = new Date();
//   const yy = dt.getFullYear();
//   const mm = ('00' + (dt.getMonth() + 1)).slice(-2);
//   const dd = ('00' + dt.getDate()).slice(-2);
//   const hh = ('00' + dt.getHours()).slice(-2);
//   const mi = ('00' + dt.getMinutes()).slice(-2);
//   const ss = ('00' + dt.getSeconds()).slice(-2);

//   return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + ss;
// };

// /**
//  * CSV文字列を作成する
//  */
// const createCsv = (input: any[]) => {
//   // オブジェクトの時は出力するカラムの対比表を作れる
//   // この例では左右が全く同じなので単純な配列でもいい
//   const columns = {
//     eventDate: 'eventDate',
//     eventName: 'eventName',
//     shopName: 'shopName',
//     itemName: 'itemName',
//     itemUrl: 'itemUrl',
//     imageUrl: 'imageUrl',
//     buyNum: 'buyNum',
//     buyPrice: 'buyPrice',
//   };

//   return new Promise((resolve, reject) => {
//     csv.stringify(input, { columns: columns }, (err: any, output: any) => {
//       if (err != null) {
//         return reject(err);
//       }
//       resolve(output);
//     });
//   });
// };

// /**
//  * CSV文字列を取得する
//  */
// const getCsv = (input: string) => {
//   const columns = [
//     'eventDate',
//     'eventName',
//     'shopName',
//     'itemName',
//     'itemUrl',
//     'imageUrl',
//     'buyNum',
//     'buyPrice',
//   ];

//   return new Promise((resolve, reject) => {
//     csv.parse(input, { columns: columns }, (err: any, output: any) => {
//       if (err != null) {
//         return reject(err);
//       }
//       resolve(output);
//     });
//   });
// };
