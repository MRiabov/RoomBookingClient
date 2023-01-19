import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output()
  userDeletedEvent = new EventEmitter()
  message = ''

  constructor(private router: Router,
              private dataService: DataService) {
  }

  editUser() {
    this.router.navigate(['admin', 'users'],
      {queryParams: {action: 'edit', id: this.selectedUser.id}});
  }

  deleteUser() {
    this.message = 'Deleting...'
    this.dataService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          this.userDeletedEvent.emit()
          this.router.navigate(['admin', 'users'])
        },
        error: () => {
          this.message = "Sorry, can't delete this user..."
        }
      }
    );
  }

  resetPassword() {
    this.message = 'Resetting in progress...'
    this.dataService.resetPassword(this.selectedUser.id).subscribe({
      next: value => {
        this.message = 'The password has been reset'
      },
      error: err => this.message = 'Sorry, the error has occured...'
    });
  }

}
