import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { NotizComponent } from './notiz.component';

const routes: Routes = [
  { path: '', component: NotizComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NotizComponent
  ]
})
export class NotizModule { }