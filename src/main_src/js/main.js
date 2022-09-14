/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main_src/ts/ipc/listen.ts":
/*!***************************************!*\
  !*** ./src/main_src/ts/ipc/listen.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerListener\": () => (/* binding */ registerListener)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\r\n//----------------------------------------\r\n// IPC通信\r\n// レンダラー → メイン\r\n//----------------------------------------\r\nconst registerListener = () => {\r\n    /**\r\n     * テスト用\r\n     * 語尾に \"にゃん\" を付けて返す\r\n     */\r\n    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('send-test-message', (event, message) => {\r\n        return `${message}にゃん`;\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://electron-angular-prj/./src/main_src/ts/ipc/listen.ts?");

/***/ }),

/***/ "./src/main_src/ts/ipc/send.ts":
/*!*************************************!*\
  !*** ./src/main_src/ts/ipc/send.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"testSendMethod\": () => (/* binding */ testSendMethod)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./src/main_src/ts/main.ts\");\n\r\n//----------------------------------------\r\n// IPC通信\r\n// メイン → レンダラー\r\n//----------------------------------------\r\n/**\r\n * サンプルテストメソッド\r\n */\r\nconst testSendMethod = () => {\r\n    // ！！これはテスト用です！！\r\n    // 10秒置きに乱数をレンダラープロセスに送る\r\n    setInterval(() => {\r\n        const rnd = Math.floor(Math.random());\r\n        _main__WEBPACK_IMPORTED_MODULE_0__.mainWindow?.webContents.send('onTestRandom', rnd);\r\n    }, 10000);\r\n};\r\n\n\n//# sourceURL=webpack://electron-angular-prj/./src/main_src/ts/ipc/send.ts?");

/***/ }),

/***/ "./src/main_src/ts/main.ts":
/*!*********************************!*\
  !*** ./src/main_src/ts/main.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isDebug\": () => (/* binding */ isDebug),\n/* harmony export */   \"mainWindow\": () => (/* binding */ mainWindow)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ipc_send__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ipc/send */ \"./src/main_src/ts/ipc/send.ts\");\n/* harmony import */ var _ipc_listen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ipc/listen */ \"./src/main_src/ts/ipc/listen.ts\");\n// アプリケーション作成用のモジュールを読み込み\r\n\r\nconst url = __webpack_require__(/*! url */ \"url\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\n\r\n// デバッグモードフラグ\r\n// @ts-ignore\r\nlet isDebug = \"development\" === 'development';\r\n// メインウィンドウ\r\nlet mainWindow;\r\n// 二重起動確認用\r\nconst gotTheLock = electron__WEBPACK_IMPORTED_MODULE_0__.app.requestSingleInstanceLock();\r\n// false(既に起動)の場合　即終了\r\nif (!gotTheLock) {\r\n    console.log('二重起動ストップ!! 即停止!!');\r\n    electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();\r\n}\r\n/**\r\n * メインウィンドウの作成\r\n */\r\nconst createMainWindow = () => {\r\n    // メインウィンドウを作成\r\n    mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({\r\n        width: 1200,\r\n        height: 800,\r\n        minWidth: 1200,\r\n        minHeight: 800,\r\n        webPreferences: {\r\n            // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする\r\n            nodeIntegration: true,\r\n            // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、\r\n            // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。\r\n            preload: path.join(__dirname, 'preload.js'),\r\n        },\r\n    });\r\n    // メインウィンドウに表示するURLを指定\r\n    mainWindow.loadURL(url.format({\r\n        pathname: path.join(__dirname, `../../../dist/index.html`),\r\n        protocol: 'file:',\r\n        slashes: true,\r\n    }));\r\n    // デベロッパーツールの起動\r\n    // mainWindow.webContents.openDevTools();\r\n    // メインウィンドウが閉じられたときの処理\r\n    mainWindow.on('closed', () => {\r\n        mainWindow = null;\r\n    });\r\n    // メイン → レンダラーへIPC通信\r\n    // サンプルテスト用です。\r\n    (0,_ipc_send__WEBPACK_IMPORTED_MODULE_1__.testSendMethod)();\r\n};\r\n/**\r\n * ログフォルダの作成\r\n */\r\nconst makeLogDir = () => {\r\n    const fs = __webpack_require__(/*! fs */ \"fs\");\r\n    fs.mkdir('log/info', { recursive: true }, (err) => {\r\n        if (err) {\r\n            throw err;\r\n        }\r\n    });\r\n    fs.mkdir('log/error', { recursive: true }, (err) => {\r\n        if (err) {\r\n            throw err;\r\n        }\r\n    });\r\n};\r\n/**\r\n * メインメニューの作成\r\n */\r\nconst initWindowMenu = () => {\r\n    const operationSubmenu = [\r\n        // { label: '画面更新', role: 'reload' },\r\n        // { label: '強制更新', role: 'forceReload' },\r\n        // { label: 'DevToolsを開く', role: 'toggleDevTools' },\r\n        // { type: 'separator' },\r\n        // { role: 'resetZoom' },\r\n        // { role: 'zoomIn' },\r\n        // { role: 'zoomOut' },\r\n        // { type: 'separator' },\r\n        { label: 'フルスクリーン/解除', role: 'togglefullscreen' },\r\n    ];\r\n    if (isDebug) {\r\n        operationSubmenu.push({ label: 'DevToolsを開く', role: 'toggleDevTools' });\r\n    }\r\n    const template = [\r\n        {\r\n            label: 'ファイル',\r\n            submenu: [{ label: '終了', role: 'quit' }],\r\n        },\r\n        {\r\n            label: '操作',\r\n            submenu: operationSubmenu,\r\n        },\r\n        {\r\n            label: 'ヘルプ',\r\n            role: 'help',\r\n            submenu: [\r\n                { label: '契約状況' },\r\n                {\r\n                    label: 'Learn More',\r\n                    click: async () => {\r\n                        await electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal('https://electronjs.org');\r\n                    },\r\n                },\r\n            ],\r\n        },\r\n    ];\r\n    const menu = electron__WEBPACK_IMPORTED_MODULE_0__.Menu.buildFromTemplate(template);\r\n    electron__WEBPACK_IMPORTED_MODULE_0__.Menu.setApplicationMenu(menu);\r\n};\r\n// 初期化が完了した時の処理\r\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {\r\n    isDebug = true;\r\n    // ログフォルダ作成\r\n    makeLogDir();\r\n    // ウィンドウメニューをカスタマイズ\r\n    initWindowMenu();\r\n    // メインウィンドウの作成\r\n    createMainWindow();\r\n    // IPC通信リスナ登録\r\n    (0,_ipc_listen__WEBPACK_IMPORTED_MODULE_2__.registerListener)();\r\n    // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）\r\n    electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => {\r\n        // メインウィンドウが消えている場合は再度メインウィンドウを作成する\r\n        if (electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getAllWindows().length === 0) {\r\n            createMainWindow();\r\n        }\r\n    });\r\n});\r\n// 全てのウィンドウが閉じたときの処理\r\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {\r\n    // macOSのとき以外はアプリケーションを終了する\r\n    if (process.platform !== 'darwin') {\r\n        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();\r\n    }\r\n});\r\n// ホットリロード\r\nif (isDebug) {\r\n    const mainSrcDir = path.join(__dirname);\r\n    const frontSrcDir = path.join(__dirname, '..', '..', '..', 'dist');\r\n    const eleDir = path.join(__dirname, '..', '..', '..', 'node_modules', 'electron', 'dist', 'electron.exe');\r\n    __webpack_require__(/*! electron-reload */ \"electron-reload\")([mainSrcDir, frontSrcDir], {\r\n        electron: eleDir,\r\n        forceHardReset: true,\r\n        hardResetMethod: 'exit',\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://electron-angular-prj/./src/main_src/ts/main.ts?");

/***/ }),

/***/ "electron-reload":
/*!**********************************!*\
  !*** external "electron-reload" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("electron-reload");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main_src/ts/main.ts");
/******/ 	
/******/ })()
;