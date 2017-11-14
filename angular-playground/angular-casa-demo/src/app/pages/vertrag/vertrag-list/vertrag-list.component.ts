import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Vertrag } from './vertrag.model';
import { ColumnModel } from './vertrag.model';
import { VetragFacadeService } from './vertrag-facade.service';

import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'c-vertrag-list',
  templateUrl: './vertrag-list.component.html',
  styleUrls: ['./vertrag-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VertragListComponent implements OnInit {

  vertraege: Vertrag[];  
  selectedVertrag: Vertrag;

  cols: ColumnModel[];
  private _selectedColValues: ColumnModel[];

  constructor(private vetragFacadeService: VetragFacadeService) { }

  ngOnInit() {
    this.cols = [
      {field: 'bezeichnung', header: 'Vertrag'},
      {field: 'vertragsp', header: 'Vertragspartner'},
      {field: 'reisender', header: 'Reisender'},
      {field: 'gueltigab', header: 'Gültig ab', singleRow: true},
      {field: 'status', header: 'Status', singleRow: true},
      {field: 'gekuendet', header: 'Gekündet per', singleRow: true}
    ];

    this.selectedColValues = [... this.cols];

    this.vertraege = this.vetragFacadeService.getVertraege();
  }

  set selectedColValues(values) {
    // intercept and sort
    this._selectedColValues = values;
    this._selectedColValues.sort((a, b) => {
      let idxa = this.cols.findIndex(function(element){return element.field === a.field});
      let idxb = this.cols.findIndex(function(element){return element.field === b.field});

      return idxa - idxb;
    });
  }

  get selectedColValues() {
    return this._selectedColValues;
  }
}