import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home-module/home/home.module').then((x) => x.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [AppComponent, AlertComponent, ModalComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
