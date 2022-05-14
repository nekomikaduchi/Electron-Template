import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/shared/service/auth.service';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  currentPassHide: boolean = true;
  newPassHide: boolean = true;
  confirmPassHide: boolean = true;

  focus1: boolean = false;
  focus2: boolean = false;
  focus3: boolean = false;

  passForm = new FormGroup({
    currentPass: new FormControl('', Validators.required),
    newPass: new FormControl('', Validators.required),
    confirmPass: new FormControl('', Validators.required),
  });

  constructor(
    public modalRef: NgbActiveModal,
    private utilService: UtilService,
    private authService: AuthService
  ) {}

  get currentPass() {
    return this.passForm.get('currentPass');
  }
  get newPass() {
    return this.passForm.get('newPass');
  }
  get confirmPass() {
    return this.passForm.get('confirmPass');
  }

  ngOnInit() {}

  /**
   * パスワード変更確認ダイアログ
   */
  public async onOkClick(): Promise<void> {
    const { currentPass, newPass, confirmPass } = this.passForm.getRawValue();

    if (this.passForm.valid && newPass === confirmPass) {
      const res1: any = await this.utilService.showSweetConfirm(
        'パスワードを変更します。<br>よろしいですか？'
      );

      if (!res1.isConfirmed) {
        return;
      }

      this.utilService.openLoading();
      try {
        // パスワード変更処理
        if (await this.authService.changePassword(currentPass, newPass)) {
          this.modalRef.close('OK');
        } else {
          null;
        }
      } catch (error) {
        console.log(error);
      }

      this.utilService.closeLoading();
    }
  }
}
