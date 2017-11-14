import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { KommunikationComponent } from './kommunikation.component';

const routes: Routes = [
  { path: '', component: KommunikationComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    KommunikationComponent
  ]
})
export class KommunikationModule { }