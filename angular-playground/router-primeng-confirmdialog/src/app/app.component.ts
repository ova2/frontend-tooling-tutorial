import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['src/app/app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
