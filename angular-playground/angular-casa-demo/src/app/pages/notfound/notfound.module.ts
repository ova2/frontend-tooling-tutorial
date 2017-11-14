import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { NotfoundComponent } from './notfound.component';

const routes: Routes = [
  { path: '', component: NotfoundComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NotfoundComponent
  ]
})
export class NotfoundModule { }