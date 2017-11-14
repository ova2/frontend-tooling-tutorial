import { Injectable } from '@angular/core';

import { vertragList } from '../../../mock/vertrag-list';
import { Vertrag } from './vertrag.model';
import { UserFacadeService } from '../../../core/user/user-facade.service';

@Injectable()
export class VetragFacadeService {

  constructor(private userFacadeService: UserFacadeService) { }

  getVertraege(): Vertrag[] {
    return <Vertrag[]> vertragList[this.userFacadeService.getUser().id];
  }
}