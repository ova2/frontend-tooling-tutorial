import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Vertrag } from '../vertrag-list/vertrag.model';

@Component({
  selector: 'c-vertrag-history',
  templateUrl: './vertrag-history.component.html',
  encapsulation: ViewEncapsulation.None
})
export class VertragHistoryComponent implements OnInit {

  // current selected Vertrag
  @Input()  
  vertrag: Vertrag;

  constructor() { }

  ngOnInit() {
  }
}