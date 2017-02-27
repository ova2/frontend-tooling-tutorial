import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ButtonModule} from 'primeng/components/button/button';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ConfirmationService} from 'primeng/components/common/api';

import {AppComponent}  from './app.component';
import {FirstViewComponent} from './first-view/first-view.component';
import {SecondViewComponent} from './second-view/second-view.component';
import {UnsavedChangesGuard} from './guards/unsaved-changes.guard';
import {routes} from './app-routing.module';

@NgModule({
    imports: [BrowserModule, routes, ButtonModule, ConfirmDialogModule],
    declarations: [AppComponent, FirstViewComponent, SecondViewComponent],
    providers: [ConfirmationService, UnsavedChangesGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
