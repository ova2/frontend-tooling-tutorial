import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserFacadeService } from '../user/user-facade.service';
import { User } from '../user/user.model';

@Component({
  selector: 'c-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainNavigationComponent implements OnInit {

  constructor(private userFacadeService: UserFacadeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let user: User = this.userFacadeService.loadUser(this.route.snapshot.params['id']);
    if (user == null) {
      this.router.navigate(['/404']);
    }
  }

  get user(): User {
    return this.userFacadeService.getUser();
  }
}