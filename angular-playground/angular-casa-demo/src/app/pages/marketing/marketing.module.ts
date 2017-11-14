import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { MarketingComponent } from './marketing.component';

const routes: Routes = [
  { path: '', component: MarketingComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MarketingComponent
  ]
})
export class MarketingModule { }