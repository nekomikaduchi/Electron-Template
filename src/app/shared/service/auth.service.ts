import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, Hub } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import { BehaviorSubject } from 'rxjs';

import { UserBase, UserEx } from '../model/user';
import { CustomApiService } from './customApi.service';

import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class AuthService {
  // なりすましユーザーID
  spoofingId: string = '';

  // ログイン中のユーザー情報
  private readonly currentUser: BehaviorSubject<UserBase> =
    new BehaviorSubject<UserBase>(new UserBase());

  constructor(
    private authenticator: AuthenticatorService,
    private router: Router,
    private utilService: UtilService,
    private apiService: CustomApiService
  ) {
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      switch (event) {
        case 'signIn':
          this.router.navigate(['/home/user']);
          break;
        case 'signIn_failure':
          break;
        case 'signUp':
          break;
        case 'signOut':
          // なりすましリセット
          this.spoofingId = '';
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
    return this.getCurrentUser().role == 9;
  }

  /**
   * ログイン状態の取得
   * @returns
   */
  public isAuthenticated(): Promise<boolean> {
    return Auth.currentSession()
      .then((user: any) => {
        const { payload } = user?.getIdToken();
        // let role: number = 0;

        // const groups = payload['cognito:groups'];

        // /** 権限チェック **/
        // /** 0 : 一般ユーザー   **/
        // /** 9 : システム管理者 **/
        // if (groups?.includes('group_9')) {
        //   role = 9;
        // }

        let id = this.spoofingId || payload?.sub;
        return this.apiService.GetUserEx(id);
      })
      .then((user: UserEx) => {
        this.fireCurrentUser(new UserBase(user));
        return true;
      })
      .catch((error: any) => {
        console.log(error);
        this.fireCurrentUser(new UserBase());
        return false;
      });
  }

  /**
   * ログアウト
   */
  public logout() {
    // なりすましリセット
    this.spoofingId = '';
    this.fireCurrentUser(new UserBase());
    // ログアウト
    this.authenticator.signOut();
  }

  /**
   * パスワードを変更する
   * @param oldPass 現在のパスワード
   * @param newPass 新しいパスワード
   */
  public async changePassword(
    oldPass: string,
    newPass: string
  ): Promise<boolean> {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(currentUser, oldPass, newPass);

      this.utilService
        .showSweetSuccess(
          `パスワードを変更しました。<br>ログイン画面へ遷移します。`
        )
        .then((res: any) => {
          this.logout();
        });

      return true;
    } catch (error: any) {
      console.log(error);
      this.utilService.showSweetError(
        `パスワード変更に失敗しました。<br> ${error.message}`
      );
      return false;
    }
  }
}
