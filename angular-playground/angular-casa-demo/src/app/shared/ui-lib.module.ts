import { NgModule } from '@angular/core';

// import needed PrimeNG or other UI lib modules here
import { ButtonModule } from 'primeng/components/button/button';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { MenuModule } from 'primeng/components/menu/menu';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { PanelModule } from 'primeng/components/panel/panel';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

const uiLibModules = [
  ButtonModule,
  TabViewModule,
  MenuModule,
  TabMenuModule,
  PanelModule,
  DataTableModule,
  OverlayPanelModule,
  CheckboxModule
]

@NgModule({
  imports: [...uiLibModules],
  exports: [...uiLibModules],
})
export class UiLibModule { }