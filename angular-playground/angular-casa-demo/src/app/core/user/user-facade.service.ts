import { Injectable } from '@angular/core';

import { users } from '../../mock/users';
import { User } from './user.model';

@Injectable()
export class UserFacadeService {

  user: User;

  constructor() { }

  loadUser(id: string): User {
    for (let user of users) {
      if (id === user.id) {
        this.user = user;
        break;
      }
    }

    return this.user;
  }

  getUser(): User {
    return this.user;
  }
}