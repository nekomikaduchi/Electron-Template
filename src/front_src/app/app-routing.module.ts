import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './SamplePrj/pages/login/login.component';

import { AdminLayoutComponent } from './SamplePrj/layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './SamplePrj/pages/user/user-list.component';

import { LoginGuard } from './shared/guard/login.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],

    children: [
      {
        path: 'user',
        component: UserListComponent,
      },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      // },
      { path: '', redirectTo: 'user', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'prefix' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
