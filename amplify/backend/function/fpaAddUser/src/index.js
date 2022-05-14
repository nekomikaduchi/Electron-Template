"use strict";
/* Amplify Params - DO NOT EDIT
    API_RAKUAMAHUNTERAPI_GRAPHQLAPIENDPOINTOUTPUT
    API_RAKUAMAHUNTERAPI_GRAPHQLAPIIDOUTPUT
    AUTH_RAKUAMAHUNTERFE9D3394_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// レイヤーの関数を読み込む
var LAYER_FUNC = require('/opt/layerFunc');
var AWS = LAYER_FUNC.AWS;
var gql = LAYER_FUNC.gql;
var region = process.env.REGION;
var cognito = new AWS.CognitoIdentityServiceProvider({ region: region });
var cognitoPoolId = process.env.AUTH_FLEAPRICEADJ9B4FE649_USERPOOLID;
var queryListUser = gql(__makeTemplateObject(["\n  query ListUsers(\n    $id: ID\n    $filter: ModelUserFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listUsers(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        mail\n        _version\n        _deleted\n      }\n      nextToken\n    }\n  }\n"], ["\n  query ListUsers(\n    $id: ID\n    $filter: ModelUserFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listUsers(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        mail\n        _version\n        _deleted\n      }\n      nextToken\n    }\n  }\n"]));
var queryCreateUser = gql(__makeTemplateObject(["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      dispName\n      mail\n      role\n      spApiFlg\n      lineFlg\n      settings\n      createdAt\n      updatedAt\n      _version\n      _deleted\n    }\n  }\n"], ["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      dispName\n      mail\n      role\n      spApiFlg\n      lineFlg\n      settings\n      createdAt\n      updatedAt\n      _version\n      _deleted\n    }\n  }\n"]));
/**
 * メイン処理
 * @param {*} event
 * @returns
 */
exports.handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dispName, mail, role, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = event.arguments.input;
                if (!data) {
                    return [2 /*return*/, JSON.stringify({
                            success: false,
                            data: 'パラメータ不正です。',
                        })];
                }
                // オブジェクトに変換
                data = JSON.parse(data);
                dispName = data.dispName, mail = data.mail, role = data.role;
                if (!role || !mail || !dispName) {
                    return [2 /*return*/, JSON.stringify({
                            success: false,
                            data: 'パラメータ不正です。',
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                // アカウント重複チェック
                return [4 /*yield*/, checkDuplicateUser(mail)];
            case 2:
                // アカウント重複チェック
                _a.sent();
                return [4 /*yield*/, createCognitoUser(mail)];
            case 3:
                user = _a.sent();
                // ユーザーを作成する(DynamoDB)
                return [4 /*yield*/, execQuery(queryCreateUser, {
                        input: {
                            id: user.User.Username,
                            dispName: dispName,
                            mail: mail,
                            role: role,
                            spApiFlg: false,
                            lineFlg: false,
                        },
                    })];
            case 4:
                // ユーザーを作成する(DynamoDB)
                _a.sent();
                return [2 /*return*/, JSON.stringify({
                        success: true,
                        data: '',
                    })];
            case 5:
                error_1 = _a.sent();
                if (typeof error_1 === 'string') {
                    // 想定内のエラー
                    return [2 /*return*/, error_1];
                }
                else {
                    console.log(error_1);
                    // 想定外のエラー
                    return [2 /*return*/, JSON.stringify({
                            success: false,
                            data: 'ユーザー作成に失敗しました。',
                        })];
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * アカウント重複チェック
 * @param mail メールアドレス
 * @returns
 */
var checkDuplicateUser = function (mail) { return __awaiter(void 0, void 0, void 0, function () {
    var users, nextToken, tmp, items;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                users = [];
                nextToken = undefined;
                _e.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, execQuery(queryListUser, {
                        filter: {
                            mail: {
                                eq: mail,
                            },
                        },
                        limit: 1500,
                        nextToken: nextToken,
                    })];
            case 2:
                tmp = _e.sent();
                items = ((_b = (_a = tmp === null || tmp === void 0 ? void 0 : tmp.data) === null || _a === void 0 ? void 0 : _a.listUsers) === null || _b === void 0 ? void 0 : _b.items) || [];
                items = items.filter(function (item) { return !item._deleted; });
                users = users.concat(items);
                nextToken = (_d = (_c = tmp === null || tmp === void 0 ? void 0 : tmp.data) === null || _c === void 0 ? void 0 : _c.listUsers) === null || _d === void 0 ? void 0 : _d.nextToken;
                if (!nextToken) {
                    return [3 /*break*/, 3];
                }
                return [3 /*break*/, 1];
            case 3:
                if (users.length) {
                    throw JSON.stringify({
                        success: false,
                        data: '既に登録済みのメールアドレスのため、登録できません。',
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * ユーザーデータを作成する(Cognito)
 * @param mail メールアドレス
 * @returns
 */
var createCognitoUser = function (mail) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var params = {
                    UserPoolId: cognitoPoolId,
                    Username: mail,
                    DesiredDeliveryMediums: ['EMAIL'],
                    ForceAliasCreation: false,
                    UserAttributes: [
                        {
                            Name: 'email_verified',
                            Value: 'true',
                        },
                        {
                            Name: 'email',
                            Value: mail,
                        },
                    ],
                };
                cognito.adminCreateUser(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            })];
    });
}); };
/**
 * Query実行
 * @param {*} query クエリ
 * @param {*} data データ
 * @returns
 */
var execQuery = function (query, data) { return __awaiter(void 0, void 0, void 0, function () {
    var ret;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, LAYER_FUNC.execQuery(query, data)];
            case 1:
                ret = _c.sent();
                if ((_b = (_a = ret === null || ret === void 0 ? void 0 : ret.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) {
                    console.log(ret);
                    throw JSON.stringify({
                        success: false,
                        data: ret.errors[0].message,
                    });
                }
                return [2 /*return*/, ret];
        }
    });
}); };
