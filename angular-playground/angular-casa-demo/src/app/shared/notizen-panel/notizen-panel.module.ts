import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiLibModule } from '../ui-lib.module';

import { NotizenPanelComponent } from './notizen-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiLibModule
  ],
  declarations: [NotizenPanelComponent],
  exports: [NotizenPanelComponent],
})
export class NotizenPanelModule { }