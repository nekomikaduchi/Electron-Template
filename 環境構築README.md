# ElectronAngularPrj

## 前提条件

- Node.js の 16 系最新安定版がインストールされていること
- @angular/cli の最新安定版がインストールされていること  
   `npm i -g @angular/cli`
- @aws-amplify/cli の最新安定版がインストールされていること  
   `npm i -g @aws-amplify/cli`

## 初期設定

- ホームディレクトリ（Windows なら通常「C:\Users\ユーザ名」）で以下の作業を行う
  1. 「.aws」フォルダを作成
  2. 作成した「.aws」フォルダ配下に config ファイルを作成
  3. 作成した「.aws」フォルダ配下に credentials ファイルを作成
  4. config ファイル、credentials ファイルの中身は別途連絡されたものを記述

---

**これより以下の設定は対象プロジェクトフォルダのルートで行う。**

### 最低限のモジュール取得

- `npm install`

### AWS Amplify 最小限の環境構築

- AWS Amplify 初期設定  
  `amplify init`

  1. プロジェクト名の入力 → 任意 （例：SamplePrj）
  2. デフォルト設定で初期化していいか聞かれるので → n

     - 環境名 : dev
     - エディター : Visual Studio Code
     - ビルドタイプ : javascript
     - フレームワーク : angular
     - ソースディレクトリ : src/front_src
     - 配布先ディレクトリ : dist/{Angular プロジェクト名} （例：dist/SamplePrj）
     - ビルドコマンド : npm.cmd run-script build
     - スタートコマンド : ng serve

  3. 認証方法を選択させられる → AWS profile
  4. プロファイル選択 → amplify-account
  5. もし「Help improve Amplify CLI ～」が出たら → n

- Cognito 初期設定  
  `amplify add auth`

  1. 認証とセキュリティの設定しますか？ → Default configuration
  2. サインイン方法を設定してください → Email
  3. 追加設定を行いますか？ → No, I am done

  `amplify update auth`

  1. What do you want to do? → Walkthrough all the auth configurations
  2. Select the authentication/authorization services that you want to use → User Sign-Up, Sign-In, connected with AWS IAM controls
  3. Allow unauthenticated logins? → Yes
  4. Do you want to enable 3rd party authentication providers in your identity pool? → No
  5. Do you want to add User Pool Groups? → No
  6. Do you want to add an admin queries API? → No
  7. Multifactor authentication (MFA) user login options → OFF
  8. Email based user registration/forgot password → Enabled
  9. Specify an email verification subject → Your verification code（任意）
  10. Specify an email verification message → (Your verification code is {####})（任意）
  11. Do you want to override the default password policy for this User Pool? → y
  12. Enter the minimum password length for this User Pool → 任意
  13. Select the password character requirements for your userpool → 任意
  14. Specify the app's refresh token expiration period (in days) → 30（任意）
  15. Do you want to specify the user attributes this app can read and write? → n
  16. Do you want to enable any of the following capabilities? → 任意
  17. Do you want to use an OAuth flow? → No
  18. Do you want to configure Lambda Triggers for Cognito? → n

- AppSync 初期設定  
  `amplify add api`

  1. REST か GraphQL か → GraphQL
  2. 「Here is GraphQL API ～」が表示されたら 以下 2 つを設定し、continue を選択
     - Name: → {任意}API （例：SamplePrjAPI）
     - Authorization modes: → Amazon Cognito User Pool
       - Configure additional auth types? → y
       - IAM を選択 ※ スペースキーで選択する
  3. スキーマテンプレート → Single
  4. スキーマを今から編集する？ → n

- 構築環境のデプロイ  
  `amplify push`

  1. Are you sure you want to continue? → y
  2. Would you like to create an API Key? → n
  3. Do you want to generate code for you newly created GraphQL API? → y
  4. Chose the code generation language target → angular
  5. Enter the file name pattern of graphql queries, mutations ～ → デフォルトのまま Enter キー
  6. Do you want to generate/update all possible GraphQL operations - queries, mutations ～ → y
  7. Enter maximum statement depth [increase from default if your schema is deeply nested] → 2
  8. Enter the file name for the generated code → src\front_src\app\API.service.ts

### AWS Amplify 環境関連

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
