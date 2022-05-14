import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import { icon } from '@fortawesome/fontawesome-svg-core';
import {
  faQuestion,
  faInfo,
  faCheck,
  faExclamation,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from 'src/app/FPA/components/loading/loading.component';

import { LoadingService } from 'src/app/FPA/components/loading/loading.service';

import { Util } from '../common/utils';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class UtilService {
  // 静的Utilクラスを定義
  Util = Util;

  activeModal: any;

  constructor(
    private modal: NgbModal,
    private loadingService: LoadingService
  ) {}

  /**
   * SweetAlert表示（確認）
   * @param html 表示内容
   */
  showSweetConfirm = (html: string) => {
    return swal.fire({
      title: `<div style="font-size:15px;font-weight:500">${html}</div>`,
      icon: 'warning',
      iconHtml: `${icon(faQuestion).html.join('')}`,
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'OK',
      cancelButtonText: 'キャンセル',
      customClass: {
        confirmButton: 'btn btn-primary mx-3',
        cancelButton: 'btn btn-light mx-3',
      },
    });
  };

  /**
   * SweetAlert表示（情報）
   * @param html 表示内容
   */
  showSweetInfo = (html: string) => {
    return swal.fire({
      title: `<div style="font-size:15px;font-weight:500">${html}</div>`,
      icon: 'info',
      iconHtml: `${icon(faInfo).html.join('')}`,
      buttonsStyling: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  };

  /**
   * SweetAlert表示（成功）
   * @param html 表示内容
   */
  showSweetSuccess = (html: string) => {
    return swal.fire({
      title: `<div style="font-size:15px;font-weight:500">${html}</div>`,
      icon: 'success',
      iconHtml: `${icon(faCheck).html.join('')}`,
      buttonsStyling: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  };

  /**
   * SweetAlert表示（警告）
   * @param html 表示内容
   */
  showSweetWarning = (html: string) => {
    return swal.fire({
      title: `<div style="font-size:15px;font-weight:500">${html}</div>`,
      icon: 'warning',
      iconHtml: `${icon(faExclamation).html.join('')}`,
      buttonsStyling: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  };

  /**
   * SweetAlert表示（エラー）
   * @param html 表示内容
   */
  showSweetError = (html: string) => {
    return swal.fire({
      title: `<div style="font-size:15px;font-weight:500">${html}</div>`,
      icon: 'error',
      iconHtml: `${icon(faTimes).html.join('')}`,
      buttonsStyling: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  };

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
