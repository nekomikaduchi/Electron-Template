import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './SamplePrj/components/components.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './SamplePrj/pages/login/login.component';
import { AdminLayoutComponent } from './SamplePrj/layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './SamplePrj/pages/user/user-list.component';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Translations } from '@aws-amplify/ui-components';
import Amplify, { I18n } from 'aws-amplify';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
I18n.putVocabularies(Translations);
I18n.setLanguage('ja');

// import amplify from '../aws-exports';
// Amplify.configure(amplify);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    UserListComponent,
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
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
