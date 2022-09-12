import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './SamplePrj/pages/login/login.component';

import { AdminLayoutComponent } from './SamplePrj/layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './SamplePrj/pages/user/user-list.component';
// import { SettingsComponent } from './RAH/pages/settings/settings.component';
// import { AmaKariListComponent } from './RAH/pages/amakari/amakari-list.component';

import { LoginGuard } from './shared/guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],

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
