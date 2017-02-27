import {Routes, RouterModule} from '@angular/router';
import {FirstViewComponent} from './first-view/first-view.component';
import {SecondViewComponent} from './second-view/second-view.component';
import {UnsavedChangesGuard} from './guards/unsaved-changes.guard';
import {ModuleWithProviders} from '@angular/core';

const router: Routes = [
    {path: '', redirectTo: 'first-view', pathMatch: 'full'},
    {path: 'first-view', component: FirstViewComponent, canDeactivate: [UnsavedChangesGuard]},
    {path: 'second-view', component: SecondViewComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
