import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserAddComponent } from './dialog/user-add/user-add.component';

import { AuthService } from 'src/app/shared/service/auth.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { UserService } from 'src/app/shared/service/user.service';

import { MODE_TYPE } from 'src/app/shared/common/enum';
import { UserEx } from 'src/app/shared/model/user';

import { Constant } from 'src/app/shared/common/constant';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  roleMap: any = Constant.ROLE_MAP;
  statusMap: any = Constant.STATUS_MAP;

  entries: number = 10;
  selected: any[] = [];
  temp: any = [];
  activeRow: any;
  rows: any = [];

  constructor(
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
    private utilService: UtilService,
    private userService: UserService
  ) {
    // 同じrouteを選択した時にリロードされるようにする設定
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  entriesChange($event: any) {
    this.entries = $event.target.value;
  }
  filterTable($event: any) {
    let val = $event.target.value;
    this.temp = this.rows.filter((d: any) => {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect(selected: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event: any) {
    this.activeRow = event.row;
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

    this.temp = this.formatData(users);

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
        stripe: user.stripe ? JSON.parse(user.stripe) : {},
      }))
      .map((user: any) => ({
        ...user,
        status: user.stripe?.status || '',
        nextDate: user.stripe?.nextDate || '',
        startDate: user.stripe?.startDate || '',
        endDate: user.stripe?.endDate || '',
        cancelPeriodEnd: user.stripe?.cancelPeriodEnd || false,
      }));
  };

  /**
   * ユーザ追加ダイアログを開く
   */
  openCreateUserDialog = () => {
    const modalRef = this.modal.open(UserAddComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: true,
      size: 'md',
      scrollable: true,
    });

    modalRef.componentInstance.parentData = {
      mode: MODE_TYPE.ADD,
    };
  };
}
