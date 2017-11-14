import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { RechnungComponent } from './rechnung.component';

const routes: Routes = [
  { path: '', component: RechnungComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RechnungComponent
  ]
})
export class RechnungModule { }