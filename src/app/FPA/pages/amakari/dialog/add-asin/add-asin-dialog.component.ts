import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/shared/service/auth.service';
import { CustomApiService } from 'src/app/shared/service/customApi.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { LoadingService } from 'src/app/FPA/components/loading/loading.service';

import { UserBase } from 'src/app/shared/model/user';

@Component({
  selector: 'app-add-asin-dialog',
  templateUrl: './add-asin-dialog.component.html',
  styleUrls: ['./add-asin-dialog.component.scss'],
})
export class AddAsinDialogComponent implements OnInit {
  currentUser: UserBase;

  asinForm = new FormGroup({
    asinList: new FormControl('', [
      Validators.required,
      Validators.pattern('(([0-9A-Z]{10}\n){1,29})?[0-9A-Z]{10}\n?'),
    ]),
  });

  constructor(
    public modalRef: NgbActiveModal,
    private authService: AuthService,
    private apiService: CustomApiService,
    private utilService: UtilService,
    private loadingService: LoadingService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  get asinList() {
    return this.asinForm.get('asinList');
  }

  ngOnInit() {}

  /**
   * ASINを登録する
   */
  public onOkClick = async (): Promise<void> => {
    this.utilService
      .showSweetConfirm(
        `ASINを登録します。<br>件数によっては時間がかかります。<br>よろしいですか？`
      )
      .then(async (res: any) => {
        if (res.isConfirmed) {
          const asinList = this.asinList?.value?.trim() || '';
          // trimして配列にする
          const asinAry = asinList?.split('\n');

          // ローディングくるくる表示
          this.utilService.openLoading(`1 / ${asinAry.length}`);
          // ASIN登録
          await this.addAmakariItem(asinAry);

          this.utilService.closeLoading();

          this.modalRef.close('OK');
        }
      });
  };

  /**
   * AmakariItem登録
   */
  private addAmakariItem = async (asinAry: string[]) => {
    // try {
    //   let errList: string[] = [];
    //   for (let i = 0; i < asinAry.length; i++) {
    //     const asin = asinAry[i];
    //     // ローディングくるくるに進捗を表示
    //     this.loadingService.fire(`${i + 1} / ${asinAry.length}`);
    //     // AmakariItem登録
    //     const res = (await this.apiService.CallFuncAddAmakariItem(
    //       JSON.stringify({
    //         userId: this.currentUser.id,
    //         asin: asin,
    //       })
    //     )) as string;
    //     const parseResult = JSON.parse(res);
    //     // エラーがあった場合
    //     if (!parseResult.success) {
    //       console.log(parseResult.data);
    //       errList.push(asin);
    //     }
    //   }
    //   if (errList.length) {
    //     let message = `以下のASINは登録に失敗しました。<br><br>`;
    //     errList.forEach((asin: string) => {
    //       message += `${asin}<br>`;
    //     });
    //     // エラーをアラート表示
    //     this.utilService.showSweetWarning(message);
    //   } else {
    //     // アラート表示
    //     this.utilService.showSweetSuccess(`登録しました。`);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   this.utilService.showSweetError(`エラーが発生しました。`);
    // }
  };
}
