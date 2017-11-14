import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { VertragComponent } from './vertrag.component';
import { VertragListComponent } from './vertrag-list/vertrag-list.component';
import { VertragHistoryComponent } from './vertrag-history/vertrag-history.component';
import { VetragFacadeService } from './vertrag-list/vertrag-facade.service';

const routes: Routes = [
  { path: '', component: VertragComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    VertragComponent,
    VertragListComponent,
    VertragHistoryComponent
  ],
  providers: [VetragFacadeService]
})
export class VertragModule { }