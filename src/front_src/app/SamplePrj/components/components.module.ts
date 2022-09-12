import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent, NavbarComponent, LoadingComponent],
  exports: [FooterComponent, NavbarComponent, LoadingComponent],
  providers: [],
})
export class ComponentsModule {
  constructor() {}
}
