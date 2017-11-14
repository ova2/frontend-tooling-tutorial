import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiLibModule } from './ui-lib.module';

import { NotizenPanelModule } from './notizen-panel/notizen-panel.module';

const sharedModules = [
  CommonModule,
  FormsModule,
  UiLibModule,
  NotizenPanelModule
]

@NgModule({
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule { }