import { Injectable } from '@angular/core';

import { CustomApiService } from './customApi.service';

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
  public async getAllUsers(): Promise<Array<any>> {
    let nextToken: string | null | undefined = undefined;
    let users: Array<any> = [];

    // // リクエストのループ
    // while (true) {
    //   const response: any = await this.apiService.ListUsers(
    //     undefined,
    //     undefined,
    //     UserService.NUMBER,
    //     undefined
    //   );
    //   users = users.concat(
    //     response.items.filter(
    //       (user: any) => !user?._deleted
    //     ) as unknown as Array<any>
    //   );
    //   // nextToken
    //   nextToken = response.nextToken;

    //   if (!nextToken) {
    //     break;
    //   }
    // }
    return users;
  }
}
