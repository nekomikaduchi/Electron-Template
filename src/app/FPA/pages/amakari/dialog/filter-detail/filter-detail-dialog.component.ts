import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/shared/service/auth.service';
import { SettingService } from 'src/app/shared/service/setting.service';
import { UtilService } from 'src/app/shared/service/util.service';

import { UserBase } from 'src/app/shared/model/user';

@Component({
  selector: 'app-filter-detail-dialog',
  templateUrl: './filter-detail-dialog.component.html',
  styleUrls: ['./filter-detail-dialog.component.scss'],
})
export class FilterDetailDialogComponent implements OnInit {
  currentUser: UserBase;

  watch?: number;
  notify?: number;

  constructor(
    public modalRef: NgbActiveModal,
    private authService: AuthService,
    private settingService: SettingService,
    private utilService: UtilService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    const { watchType, notifyType } = this.currentUser.settings.amakariFilter;
    this.watch = watchType;
    this.notify = notifyType;
  }

  /**
   * 監視ラジオボタンが変更された時に発火
   * @param event
   */
  public changeWatchRadio = (event: any) => {
    this.watch = Number(event.target.value);
  };

  /**
   * 通知価格ラジオボタンが変更された時に発火
   * @param event
   */
  public changeNotifyRadio = (event: any) => {
    this.notify = Number(event.target.value);
  };

  /**
   * 保存する
   */
  public onOkClick = async (): Promise<void> => {
    this.utilService
      .showSweetConfirm(`フィルタ設定を保存します。<br>よろしいですか？`)
      .then((res: any) => {
        if (res.isConfirmed) {
          // 変更を保存する
          this.settingService
            .updateSetting('フィルタ設定', {
              amakariFilter: { watchType: this.watch, notifyType: this.notify },
            })
            .then((result) => {
              if (result) {
                this.modalRef.close('OK');
              }
            });
        }
      });
  };
}
