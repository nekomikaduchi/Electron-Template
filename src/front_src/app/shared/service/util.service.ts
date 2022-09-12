import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from 'src/front_src/app/SamplePrj/components/loading/loading.component';

import { LoadingService } from 'src/front_src/app/SamplePrj/components/loading/loading.service';

import { Util } from '../common/utils';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // 静的Utilクラスを定義
  Util = Util;

  activeModal: any;

  constructor(
    private modal: NgbModal,
    private loadingService: LoadingService
  ) {}

  /**
   * Loadingコンポーネント表示
   * @param text 初期表示テキスト
   */
  openLoading = (text: string = '') => {
    this.activeModal = this.modal.open(LoadingComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'loading-width',
    });

    this.activeModal.shown.subscribe(() => {
      // 初期表示用テキスト
      this.loadingService.fire(text);
    });
  };

  /**
   * Loadingコンポーネント表示
   */
  closeLoading = () => {
    this.activeModal?.close();
  };
}
