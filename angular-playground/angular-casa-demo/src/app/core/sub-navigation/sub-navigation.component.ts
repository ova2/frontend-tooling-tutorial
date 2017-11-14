import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { MenuItem } from 'primeng/components/common/api';

@Component({
  selector: 'c-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubNavigationComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Übersich', icon: 'fa-list', routerLink: ['uebersicht'] },
      { label: 'Persönliche Angaben', icon: 'fa-id-card-o', routerLink: ['person'] },
      { label: 'Leistungen', icon: 'fa-book', routerLink: ['leistung'] },
      { label: 'Verträge', icon: 'fa-handshake-o', routerLink: ['vertrag'] },
      { label: 'SwissPass', icon: 'fa-user-circle', routerLink: ['swisspass'] },
      { label: 'Online-Konto', icon: 'fa-credit-card', routerLink: ['onlinekonto'] },
      { label: 'Kundenkommunikation', icon: 'fa-envelope-open-o', routerLink: ['kommunikation'] },
      { label: 'Rechnungen', icon: 'fa-money', routerLink: ['rechnung'] },
      { label: 'Marketing', icon: 'fa-share-alt', routerLink: ['marketing'] },
      { label: 'Notizen', icon: 'fa-comment', routerLink: ['notiz'] }
    ];
  }
}