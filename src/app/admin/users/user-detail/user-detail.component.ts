import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input()
  selectedUser!: User;

  constructor(private router: Router) {
  }

  editUser() {
    this.router.navigate(['admin', 'users'],
      {queryParams: {action: 'edit', id: this.selectedUser.id}});
  }


}
