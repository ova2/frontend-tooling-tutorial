import { Component, Input, VERSION } from '@angular/core'

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  version = VERSION.full
}