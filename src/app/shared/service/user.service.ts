import { Injectable } from '@angular/core';

import { CustomApiService } from './customApi.service';

import { UserEx } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: CustomApiService) {}

  private static readonly NUMBER = 1500;

  /**
   * 全てのユーザーを取得します。
   * @returns ユーザー一覧
   */
  public async getAllUsers(): Promise<UserEx[]> {
    return this.getUserCore(() => {
      return this.apiService.ListUsers(
        undefined,
        undefined,
        UserService.NUMBER,
        undefined
      );
    });
  }

  // /**
  //  * 引数で指定した役割のユーザーを取得します。
  //  * @param roles 役割一覧
  //  * @returns ユーザー一覧
  //  */
  // public async getUsersByRoles(roles: Role[]): Promise<UserEx[]> {
  //   let users = await this.getAllUsers();
  //   users = users.filter((user: UserEx) => {
  //     for (const role of roles) {
  //       if (role.value == user.role) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   })
  //   return users;
  // }

  /**
   * 引数の関数を使用してユーザーを取得します。
   * @param func ユーザー取得関数
   * @returns ユーザー一覧
   */
  private async getUserCore(func: () => Promise<any>): Promise<UserEx[]> {
    let nextToken: string | null | undefined = undefined;
    let users: UserEx[] = [];

    // リクエストのループ
    while (true) {
      const response: any = await func();
      users = users.concat(
        response.items.filter(
          (user: any) => !user?._deleted
        ) as unknown as UserEx
      );
      // nextToken
      nextToken = response.nextToken;

      if (!nextToken) {
        break;
      }
    }
    return users;
  }
}
