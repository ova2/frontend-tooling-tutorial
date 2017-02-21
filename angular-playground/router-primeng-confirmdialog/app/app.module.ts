import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './components/application/app';
import {ButtonModule} from 'primeng/components/button/button';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ConfirmationService} from 'primeng/components/common/api';
import {Routes, RouterModule} from '@angular/router';
import {UnsavedChangesGuard} from './guards/UnsavedChangesGuard';
import {FirstViewComponent} from './components/first-view/first-view';
import {SecondViewComponent} from './components/second-view/second-view';

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'first-view', component: FirstViewComponent, canDeactivate: [UnsavedChangesGuard]},
    {path: 'second-view', component: SecondViewComponent}
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), ButtonModule, ConfirmDialogModule],
    declarations: [AppComponent, FirstViewComponent, SecondViewComponent],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
