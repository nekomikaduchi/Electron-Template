import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

import { AuthService } from 'src/front_src/app/shared/service/auth.service';
import { UtilService } from 'src/front_src/app/shared/service/util.service';

import { UserBase } from 'src/front_src/app/shared/model/user';

import { environment } from 'src/front_src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // public statusMap: any = Constant.STATUS_MAP;

  public listTitles?: any[];
  public location: Location;
  public sidenavOpen: boolean = true;

  public title: string = environment.title;

  public currentUser?: UserBase;

  constructor(
    location: Location,
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
    private utilService: UtilService
  ) {
    this.location = location;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove('g-sidenav-pinned');
          document.body.classList.add('g-sidenav-hidden');
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  /**
   * 契約管理ダイアログを開く
   */
  public openPaymentDialog = () => {
    // // if (!environment.production) {
    // const currentUser = this.authService.getCurrentUser();
    // const modalRef = this.modal.open(StripeDialogComponent, {
    //   centered: true,
    //   backdrop: 'static',
    //   keyboard: true,
    //   size: 'sm',
    //   scrollable: true,
    // });
    // modalRef.componentInstance.parentData = {
    //   mode: currentUser.customerId ? MODE_TYPE.EDIT : MODE_TYPE.ADD,
    // };
    // // } else {
    // //   alert('未実装');
    // // }
  };

  /**
   * パスワード変更ダイアログを開く
   */
  public openChangePassDialog = () => {
    // this.modal.open(PasswordDialogComponent, {
    //   centered: true,
    //   backdrop: 'static',
    //   keyboard: true,
    //   size: 'sm',
    //   scrollable: true,
    // });
  };

  /**
   * ログアウト
   */
  public logout = () => {
    // this.utilService
    //   .showSweetConfirm('ログアウトします。<br>よろしいですか？')
    //   .then((result: any) => {
    //     if (result.value) {
    //       // ログアウト処理
    //       this.authService.logout();
    //     }
    //   });

    // ログアウト処理
    this.authService.logout();
  };
}
