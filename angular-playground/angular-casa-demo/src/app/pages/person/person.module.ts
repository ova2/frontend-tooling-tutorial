import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { PersonComponent } from './person.component';

const routes: Routes = [
    {path: '', component: PersonComponent }    
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PersonComponent
  ]
})
export class PersonModule { }