# 開発について

## デバッグ方法

2 つターミナルを立ち上げて、それぞれで以下のコマンドを入力。  
これでソースを修正すると、自動的に Electron を再起動してくれる。

1. 開発（自動トランスパイル）モードにする → `npm run watch`
2. Electron の立ち上げ → `npm run electron`

## DB の更新

1. schema.graphql の中身を書き換える

   主キーとか細かい設定等は下記参照。  
   [Graphql のスキーマ設計](https://www.multispots.net/graphql-schema/)  
   [AWS Amplify フレームワークの使い方](https://qiita.com/too/items/fc961283dcbef3aafdeb#%E9%96%A2%E9%80%A3%E8%A8%98%E4%BA%8B)の Part5 ～ Part8

   例えば以下のように記載すれば、ユーザーテーブルを作成（更新）ができる。

   ```
   # ユーザーテーブル
   type User
     @model
     @auth(
       rules: [
         {
           allow: private
           provider: userPools
           operations: [read, create, update, delete]
         }
         { allow: private, provider: iam, operations: [read, update, delete] }
       ]
     ) {
     id: ID! @primaryKey
     dispName: String!
     mail: String!
     role: Int!
     spApiFlg: Boolean!
     lineFlg: Boolean!
     customerId: String
     stripe: AWSJSON
     secret: AWSJSON
     settings: AWSJSON
   }
   ```

2. `amplify push` で DB が更新される  
   （※ ついでに DynamoDB へのアクセス用サービスファイル（API.service.ts）や型定義ファイルのソースを自動作成してくれる）

## その他

- `amplify status` サーバー側リソース全体の状況を確認できます。
- `amplify status api -acm {テーブル名}` DynamoDB テーブル毎のアクセス権限が確認できます。

## AWS Amplify 環境関連

- 現在の環境確認  
  `amplify env list`

- 新規環境追加（本番用、検証用、開発用などが考えられる)  
  `amplify env add`

  1.  環境名 → 任意 （例：stag）
  2.  認証方法 → AWS profile
  3.  プロファイル選んで → amplify-account
  4.  ※環境作るとバックエンドが自動的に新しく作った環境に切り替わるので注意
  5.  `amplify push` 新しい環境でバックエンドをデプロイ

- 環境の切り替え  
  `amplify env checkout {環境名}`

- 環境の削除  
  `amplify env remove {環境名}`
