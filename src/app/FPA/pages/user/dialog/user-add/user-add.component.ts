import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MODE_TYPE } from 'src/app/shared/common/enum';
import { Util } from 'src/app/shared/common/utils';

import { AuthService } from 'src/app/shared/service/auth.service';
import { CustomApiService } from 'src/app/shared/service/customApi.service';
import { UtilService } from 'src/app/shared/service/util.service';

import { Constant } from 'src/app/shared/common/constant';
import { UserBase } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  util = Util;
  currentUser: UserBase;

  @Input() parentData: any;

  mode?: MODE_TYPE;
  title?: string;
  titleIcon: any;

  roleMap = Constant.ROLE_MAP;

  userForm = new FormGroup({
    dispName: new FormControl('', Validators.required),
    role: new FormControl(1, Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  focus1: boolean = false;
  focus2: boolean = false;
  focus3: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    private authService: AuthService,
    private apiService: CustomApiService,
    private utilService: UtilService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  get dispName() {
    return this.userForm.get('dispName');
  }
  get mail() {
    return this.userForm.get('mail');
  }
  get role() {
    return this.userForm.get('role');
  }

  ngOnInit() {
    this.mode = this.parentData.mode;

    switch (this.mode) {
      case MODE_TYPE.ADD:
        this.title = 'ユーザ追加';
        this.titleIcon = ['fas', 'user-plus'];
        break;
    }
  }

  /**
   * ユーザー情報を追加する
   */
  async addUser(): Promise<void> {
    const res1: any = await this.utilService.showSweetConfirm(
      'ユーザを追加します。<br>よろしいですか？'
    );

    if (!res1.isConfirmed) {
      return;
    }

    this.utilService.openLoading();
    try {
      // ユーザー情報を追加
      const res2 = (await this.apiService.CallFuncAddUser(
        JSON.stringify(this.userForm.getRawValue())
      )) as string;

      const parseResult = JSON.parse(res2);

      if (parseResult.success) {
        this.utilService
          .showSweetSuccess('ユーザーを追加しました。')
          .then((res: any) => {
            this.modalRef.close('OK');
          });
      }
      // エラーがあった場合
      else {
        this.utilService.showSweetWarning(parseResult.data).then((res: any) => {
          console.log(parseResult.data);
        });
      }
    } catch (error) {
      console.log(error);
    }

    this.utilService.closeLoading();
  }

  // /**
  //  * ユーザー情報を更新する
  //  */
  // editUser(): void {
  //   if (this.userForm.valid) {
  //     this.dialog
  //       .open(MyDialogComponent, {
  //         disableClose: true,
  //         data: {
  //           title: "確認",
  //           type: "confirm",
  //           message: "ユーザー情報を更新します。よろしいですか？",
  //           cancelShow: true,
  //         },
  //       })
  //       .afterClosed()
  //       .subscribe((result) => {
  //         if (result === "OK") {
  //           // ローディングダイアログ表示
  //           let loadingDialog = this.dialog.open(LoadingScreenComponent, {
  //             disableClose: true,
  //           });

  //           // ユーザー情報を更新
  //           from(
  //             this.apiService.UpdateUser({
  //               id: this.data.user.id,
  //               role: this.userForm.get("role")?.value,
  //               _version: this.data.user._version,
  //             })
  //           )
  //             .pipe(
  //               finalize(() => {
  //                 loadingDialog.close();
  //               })
  //             )
  //             .subscribe(
  //               (response: any) => {
  //                 this.dialog
  //                   .open(MyDialogComponent, {
  //                     disableClose: true,
  //                     data: {
  //                       title: "完了",
  //                       type: "info",
  //                       message: "ユーザー情報を更新しました。",
  //                       cancelShow: false,
  //                     },
  //                   })
  //                   .afterClosed()
  //                   .subscribe((result) => {
  //                     if (result === "OK") {
  //                       this.dialogRef.close("OK");
  //                     }
  //                   });
  //               },
  //               (error) => {
  //                 console.log(error);
  //                 this.dialog.open(MyDialogComponent, {
  //                   disableClose: true,
  //                   data: {
  //                     title: "エラー",
  //                     type: "error",
  //                     message: error?.errors[0].message,
  //                     cancelShow: false,
  //                   },
  //                 });
  //               }
  //             );
  //         }
  //       });
  //   }
  // }

  // /**
  //  * ユーザー情報を削除する
  //  */
  // deleteUser(): void {
  //   this.dialog
  //     .open(MyDialogComponent, {
  //       width: "300px",
  //       disableClose: true,
  //       data: {
  //         title: "確認",
  //         type: "confirm",
  //         message: "本当に削除してもよろしいですか？",
  //         cancelShow: true,
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe(async (result) => {
  //       if (result === "OK") {
  //         // ローディングダイアログ表示
  //         let loadingDialog = this.dialog.open(LoadingScreenComponent, {
  //           disableClose: true,
  //         });

  //         const { id, mail } = this.data.user;

  //         // ユーザー情報を削除
  //         const result = (await this.apiService.CallFuncDeleteUser(
  //           JSON.stringify({
  //             id: id,
  //             mail: mail,
  //           })
  //         )) as string;

  //         const parseResult = JSON.parse(result);

  //         if (parseResult.success) {
  //           this.dialog
  //             .open(MyDialogComponent, {
  //               disableClose: true,
  //               data: {
  //                 title: "完了",
  //                 type: "info",
  //                 message: "ユーザーを削除しました。",
  //                 cancelShow: false,
  //               },
  //             })
  //             .afterClosed()
  //             .subscribe((result) => {
  //               if (result === "OK") {
  //                 this.dialogRef.close("OK");
  //               }
  //             });
  //         }
  //         // エラーがあった場合
  //         else {
  //           this.dialog.open(MyDialogComponent, {
  //             disableClose: true,
  //             data: {
  //               title: "警告",
  //               type: "warning",
  //               message: parseResult.data,
  //               cancelShow: false,
  //             },
  //           });
  //         }

  //         loadingDialog.close();
  //       }
  //     });
  // }
}
