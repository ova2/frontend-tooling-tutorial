import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { SwissPassComponent } from './swisspass.component';

const routes: Routes = [
    {path: '', component: SwissPassComponent }    
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SwissPassComponent
  ]
})
export class SwissPassModule { }