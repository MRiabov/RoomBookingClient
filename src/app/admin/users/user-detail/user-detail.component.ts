import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input()
  selectedUser!: User;

  constructor(private router: Router,
              private dataService:DataService) {
  }

  editUser() {
    this.router.navigate(['admin', 'users'],
      {queryParams: {action: 'edit', id: this.selectedUser.id}});
  }

  deleteUser() {
    this.dataService.deleteUser(this.selectedUser.id).subscribe(
      () =>
        this.router.navigate(['admin', 'users'])
    );
  }

  resetPassword(){
    this.dataService.resetPassword(this.selectedUser.id).subscribe();
  }

}
