/* Amplify Params - DO NOT EDIT
	API_RAKUAMAHUNTERAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_RAKUAMAHUNTERAPI_GRAPHQLAPIIDOUTPUT
	AUTH_RAKUAMAHUNTERFE9D3394_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// レイヤーの関数を読み込む
const LAYER_FUNC = require('/opt/layerFunc');

const AWS = LAYER_FUNC.AWS;
const gql = LAYER_FUNC.gql;

const region = process.env.REGION;
const cognito = new AWS.CognitoIdentityServiceProvider({ region: region });
const cognitoPoolId = process.env.AUTH_FLEAPRICEADJ9B4FE649_USERPOOLID;

const queryListUser = gql`
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mail
        _version
        _deleted
      }
      nextToken
    }
  }
`;

const queryCreateUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      dispName
      mail
      role
      spApiFlg
      lineFlg
      settings
      createdAt
      updatedAt
      _version
      _deleted
    }
  }
`;

/**
 * メイン処理
 * @param {*} event
 * @returns
 */
exports.handler = async (event: any) => {
  let data = event.arguments.input;

  if (!data) {
    return JSON.stringify({
      success: false,
      data: 'パラメータ不正です。',
    });
  }

  // オブジェクトに変換
  data = JSON.parse(data);

  // 表示名、メールアドレス、権限
  const { dispName, mail, role } = data;

  if (!role || !mail || !dispName) {
    return JSON.stringify({
      success: false,
      data: 'パラメータ不正です。',
    });
  }

  try {
    // アカウント重複チェック
    await checkDuplicateUser(mail);
    // ユーザーを作成する(Cognito)
    const user: any = await createCognitoUser(mail);

    // ユーザーを作成する(DynamoDB)
    await execQuery(queryCreateUser, {
      input: {
        id: user.User.Username,
        dispName: dispName,
        mail: mail,
        role: role,
        spApiFlg: false,
        lineFlg: false,
      },
    });

    return JSON.stringify({
      success: true,
      data: '',
    });
  } catch (error) {
    if (typeof error === 'string') {
      // 想定内のエラー
      return error;
    } else {
      console.log(error);
      // 想定外のエラー
      return JSON.stringify({
        success: false,
        data: 'ユーザー作成に失敗しました。',
      });
    }
  }
};

/**
 * アカウント重複チェック
 * @param mail メールアドレス
 * @returns
 */
const checkDuplicateUser = async (mail: string) => {
  let users: any = [];
  let nextToken: string | null | undefined = undefined;

  while (true) {
    // ユーザー取得
    const tmp: any = await execQuery(queryListUser, {
      filter: {
        mail: {
          eq: mail,
        },
      },
      limit: 1500,
      nextToken: nextToken,
    });
    let items = tmp?.data?.listUsers?.items || [];
    items = items.filter((item: any) => !item._deleted);
    users = users.concat(items);

    nextToken = tmp?.data?.listUsers?.nextToken;

    if (!nextToken) {
      break;
    }
  }

  if (users.length) {
    throw JSON.stringify({
      success: false,
      data: '既に登録済みのメールアドレスのため、登録できません。',
    });
  }
};

/**
 * ユーザーデータを作成する(Cognito)
 * @param mail メールアドレス
 * @returns
 */
const createCognitoUser = async (mail: string) => {
  return new Promise((resolve, reject) => {
    const params = {
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

    cognito.adminCreateUser(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Query実行
 * @param {*} query クエリ
 * @param {*} data データ
 * @returns
 */
const execQuery = async (query: string, data: any) => {
  const ret = await LAYER_FUNC.execQuery(query, data);

  if (ret?.errors?.[0]?.message) {
    console.log(ret);
    throw JSON.stringify({
      success: false,
      data: ret.errors[0].message,
    });
  }

  return ret;
};
