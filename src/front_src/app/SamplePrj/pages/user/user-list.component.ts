import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/front_src/app/shared/service/auth.service';
import { UserService } from 'src/front_src/app/shared/service/user.service';
import { UtilService } from 'src/front_src/app/shared/service/util.service';

import { Constant } from 'src/front_src/app/shared/common/constant';
import { UserEx } from 'src/front_src/app/shared/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  roleMap: any = Constant.ROLE_MAP;
  users: any = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private utilService: UtilService
  ) {
    // 同じrouteを選択した時にリロードされるようにする設定
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    // ローディングダイアログ表示
    this.utilService.openLoading();

    let users: UserEx[] = [];

    if (this.authService.isSysManager()) {
      // システム管理者
      users = await this.userService.getAllUsers();
    }

    // ソート
    // 第１：権限
    // 第２：表示名
    users.sort((a: UserEx, b: UserEx) => {
      if (a.role > b.role) {
        return 1;
      } else if (a.role === b.role) {
        return a.dispName > b.dispName ? 1 : -1;
      } else {
        return -1;
      }
    });

    this.users = this.formatData(users);

    this.utilService.closeLoading();
  }

  /**
   * データを整形する
   * @param users ユーザ情報
   */
  private formatData = (users: UserEx[]) => {
    return users
      .map((user: UserEx) => ({
        ...user,
        // stripe: user.stripe ? JSON.parse(user.stripe) : {},
      }))
      .map((user: any) => ({
        ...user,
        // status: user.stripe?.status || '',
        // nextDate: user.stripe?.nextDate || '',
        // startDate: user.stripe?.startDate || '',
        // endDate: user.stripe?.endDate || '',
        // cancelPeriodEnd: user.stripe?.cancelPeriodEnd || false,
      }));
  };

  // /**
  //  * ユーザ追加ダイアログを開く
  //  */
  // openCreateUserDialog = () => {
  //   const modalRef = this.modal.open(UserAddComponent, {
  //     centered: true,
  //     backdrop: 'static',
  //     keyboard: true,
  //     size: 'md',
  //     scrollable: true,
  //   });

  //   modalRef.componentInstance.parentData = {
  //     mode: MODE_TYPE.ADD,
  //   };
  // };
}
