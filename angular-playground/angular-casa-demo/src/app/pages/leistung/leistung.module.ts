import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { LeistungComponent } from './leistung.component';

const routes: Routes = [
    {path: '', component: LeistungComponent }    
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LeistungComponent
  ]
})
export class LeistungModule { }