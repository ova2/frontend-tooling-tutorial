import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component'
import { MainNavigationComponent } from './main-navigation/main-navigation.component'
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { UserFacadeService } from './user/user-facade.service';

const components = [
  FooterComponent,
  MainNavigationComponent,
  SubNavigationComponent
]

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components],
  providers: [UserFacadeService],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}