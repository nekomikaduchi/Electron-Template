import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import { BehaviorSubject } from 'rxjs';

import { UserBase, UserEx } from '../model/user';
import { CustomApiService } from './customApi.service';
import { ROLE_TYPE } from '../common/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ログイン中のユーザー情報
  private readonly currentUser: BehaviorSubject<UserBase> =
    new BehaviorSubject<UserBase>(new UserBase());

  constructor(
    private authenticator: AuthenticatorService,
    private router: Router,
    private apiService: CustomApiService
  ) {
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      switch (event) {
        case 'signIn':
          this.router.navigate(['/home']);
          break;
        case 'signIn_failure':
          break;
        case 'signUp':
          break;
        case 'signOut':
          this.router.navigate(['/login']);
          break;
      }
    });
  }

  /**
   * 現在のログイン中のユーザー情報
   * @returns UserBase
   */
  getCurrentUser(): UserBase {
    return this.currentUser.getValue();
  }

  /**
   * ログイン中のユーザー情報を流す
   * @returns UserBase
   */
  fireCurrentUser(user: UserBase): void {
    this.currentUser.next(user);
  }

  /**
   * システム管理者かどうか
   */
  isSysManager(): boolean {
    return this.getCurrentUser().role == ROLE_TYPE.SYS_MNG;
  }

  /**
   * ログイン状態の取得
   * @returns
   */
  public isAuthenticated(): Promise<boolean> {
    return Auth.currentSession()
      .then((user: any) => {
        const { payload } = user?.getIdToken();
        let id = payload?.sub;
        return this.apiService.GetUserEx(id);
      })
      .then((user: UserEx) => {
        this.fireCurrentUser(new UserBase(user));
        // 認証をcognitoユーザプールに設定
        Amplify.configure({
          aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        });
        return true;
      })
      .catch((error: any) => {
        console.log(error);
        this.fireCurrentUser(new UserBase());
        // 認証をiamに設定
        Amplify.configure({
          aws_appsync_authenticationType: 'AWS_IAM',
        });
        return false;
      });
  }

  /**
   * ログアウト
   */
  public logout() {
    // ログイン情報初期化
    this.fireCurrentUser(new UserBase());
    // ログアウト
    this.authenticator.signOut();
  }
}
