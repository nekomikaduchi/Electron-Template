import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { CustomApiService } from './customApi.service';
import { UtilService } from './util.service';

import { UserBase } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(
    private authService: AuthService,
    private apiService: CustomApiService,
    private utilService: UtilService
  ) {}

  /**
   * 設定情報を保存する
   * @param message メッセージ
   * @param settings 設定情報
   */
  public async updateSetting(message: string, settings: any) {
    // ローディングダイアログ表示
    this.utilService.openLoading();

    const currentUser = this.authService.getCurrentUser();
    const updateSettings = { ...currentUser.settings, ...settings };

    try {
      const response = await this.apiService.UpdateUser({
        id: currentUser.id,
        _version: currentUser.version,
        settings: JSON.stringify(updateSettings),
      });
      this.utilService.closeLoading();

      // ユーザー情報を流す
      this.authService.fireCurrentUser(new UserBase(response));

      this.utilService.showSweetSuccess(`${message}を保存しました。`);

      return true;
    } catch (error: any) {
      this.utilService.closeLoading();
      console.log(error);

      this.utilService.showSweetError(error?.errors[0]?.message);
      return false;
    }
  }
}
