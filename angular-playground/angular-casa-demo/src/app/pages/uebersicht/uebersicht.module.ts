import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { UebersichtComponent } from './uebersicht.component';

const routes: Routes = [
    {path: '', component: UebersichtComponent }    
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UebersichtComponent
  ]
})
export class UebersichtModule { }