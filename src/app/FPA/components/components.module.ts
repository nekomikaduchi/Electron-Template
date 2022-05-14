import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faBalanceScaleLeft,
  faBell,
  faCog,
  faEdit,
  faEllipsisV,
  faEnvelope,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faFileMedical,
  faFilter,
  faHome,
  faKey,
  faPlusCircle,
  faQuestion,
  faQuestionCircle,
  faRocket,
  faRunning,
  faSearch,
  faStore,
  faTh,
  faThList,
  faThumbsUp,
  faTools,
  faTrashAlt,
  faTruck,
  faUser,
  faUserCircle,
  faUserPlus,
  faUsers,
  faUserShield,
  faUserSlash,
  faYenSign,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCopy,
  faCreditCard,
  faRegistered,
} from '@fortawesome/free-regular-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';

// import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    FontAwesomeModule,
    NgbDropdownModule,
    // DxVectorMapModule,
    // DxPieChartModule,
  ],
  declarations: [FooterComponent, NavbarComponent, LoadingComponent],
  exports: [FooterComponent, NavbarComponent, LoadingComponent],
  providers: [],
})
export class ComponentsModule {
  constructor(private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(
      faAngleDown,
      faAngleLeft,
      faAngleRight,
      faArrowUp,
      faBalanceScaleLeft,
      faBell,
      faCog,
      faCopy,
      faEdit,
      faEllipsisV,
      faEnvelope,
      faExclamationTriangle,
      faEye,
      faEyeSlash,
      faFileMedical,
      faFilter,
      faHome,
      faKey,
      faPlusCircle,
      faQuestion,
      faQuestionCircle,
      faRocket,
      faRunning,
      faSearch,
      faStore,
      faTh,
      faThList,
      faTools,
      faTrashAlt,
      faTruck,
      faUser,
      faUserCircle,
      faUserPlus,
      faUsers,
      faUserShield,
      faUserSlash,
      faYenSign,
      faCreditCard,
      faRegistered,
      faThumbsUp,
      faAmazon
    );
  }
}
