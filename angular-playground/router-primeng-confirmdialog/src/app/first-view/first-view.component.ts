import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'first-view',
    templateUrl: 'src/app/first-view/first-view.component.html'
})
export class FirstViewComponent {
    constructor(private router: Router) {
    }

    gotoNextView() {
        this.router.navigate(['/second-view']);
    }
}
