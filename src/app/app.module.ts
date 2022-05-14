import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './FPA/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './FPA/pages/login/login.component';
import { AdminLayoutComponent } from './FPA/layouts/admin-layout/admin-layout.component';
import { PasswordDialogComponent } from './FPA/components/password/password-dialog.component';
import { SettingsComponent } from './FPA/pages/settings/settings.component';
import { UserListComponent } from './FPA/pages/user/user-list.component';
import { UserAddComponent } from './FPA/pages/user/dialog/user-add/user-add.component';
import { AmaKariListComponent } from './FPA/pages/amakari/amakari-list.component';
import { FilterDetailDialogComponent } from './FPA/pages/amakari/dialog/filter-detail/filter-detail-dialog.component';
import { AddAsinDialogComponent } from './FPA/pages/amakari/dialog/add-asin/add-asin-dialog.component';
import { StripeDialogComponent } from './FPA/pages/settings/dialog/stripe-dialog/stripe-dialog.component';
import { CancelDialogComponent } from './FPA/pages/settings/dialog/cancel-dialog/cancel-dialog.component';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify, { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
import amplify from '../aws-exports';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(amplify);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    PasswordDialogComponent,
    UserListComponent,
    UserAddComponent,
    SettingsComponent,
    AmaKariListComponent,
    FilterDetailDialogComponent,
    AddAsinDialogComponent,
    StripeDialogComponent,
    CancelDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AmplifyAuthenticatorModule,
    NgbModule,
    NgxDatatableModule,
    FontAwesomeModule,
    // DragDropModule,
    ClipboardModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [
    UserAddComponent,
    PasswordDialogComponent,
    FilterDetailDialogComponent,
    AddAsinDialogComponent,
    StripeDialogComponent,
    CancelDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
