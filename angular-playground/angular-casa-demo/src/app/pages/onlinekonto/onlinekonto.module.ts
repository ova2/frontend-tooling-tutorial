import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { OnlinekontoComponent } from './onlinekonto.component';

const routes: Routes = [
  { path: '', component: OnlinekontoComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OnlinekontoComponent
  ]
})
export class OnlineKontoModule { }