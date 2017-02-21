import {CanDeactivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {FirstViewComponent} from '../components/first-view/first-view';
import {ConfirmationService} from 'primeng/components/common/api';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<FirstViewComponent> {

    constructor(private confirmationService: ConfirmationService) {
    }

    canDeactivate(component: FirstViewComponent) {
        // Use with Promise: http://forum.primefaces.org/viewtopic.php?f=35&t=48357
        // Use with Observable: https://angularjs.de/artikel/angular2-observables

        this.confirmationService.confirm({
            message: 'You have unsaved changes. Are you sure you want to leave this page?',
            accept: () => {
                // TODO
            },
            reject: () => {
                // TODO
            }
        });
        
        return true;
    }
}
