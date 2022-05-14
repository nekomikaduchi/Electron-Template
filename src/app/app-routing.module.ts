import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './FPA/pages/login/login.component';

import { AdminLayoutComponent } from './FPA/layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './FPA/pages/user/user-list.component';
// import { SettingsComponent } from './RAH/pages/settings/settings.component';
// import { AmaKariListComponent } from './RAH/pages/amakari/amakari-list.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { LoginGuard } from './shared/guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      // {
      //   path: 'research-list',
      //   component: ResearchListComponent,
      // },
      // {
      //   path: 'research-ranking',
      //   component: ResearchRankingComponent,
      // },
      // {
      //   path: 'research-keyword',
      //   component: ResearchKeywordComponent,
      // },
      // {
      //   path: 'amakari-list',
      //   component: AmaKariListComponent,
      // },
      {
        path: 'user',
        component: UserListComponent,
      },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      // },
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
