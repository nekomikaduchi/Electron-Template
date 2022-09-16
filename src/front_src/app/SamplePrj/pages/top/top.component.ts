import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserEx } from 'src/front_src/app/shared/model/user';

import { AuthService } from 'src/front_src/app/shared/service/auth.service';
import { UserService } from 'src/front_src/app/shared/service/user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  users: UserEx[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    // 同じrouteを選択した時にリロードされるようにする設定
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  /**
   * ログアウト
   */
  public logout = () => {
    this.authService.logout();
  };
}
