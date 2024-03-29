import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  selectedUser!: User;

  @Output()
  dataChangedEvent = new EventEmitter();

  formUser!: User;

  warnMessage: string = '';

  password!: string;
  password2!: string;

  nameIsValid = false; /*used for validation*/
  passwordIsValid = false;
  passwordMatch!: boolean;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.selectedUser);
  }

  onSubmit() {
    this.warnMessage = 'Saving...'
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        user => {
          console.log(this.password, this.password2)
          this.dataChangedEvent.emit()
          this.router.navigate(['admin', 'users'], {queryParams: {id: user.id, action: 'view'}})
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe({
          next: user => {
            this.dataChangedEvent.emit()
            this.router.navigate(['admin', 'users'],
              {queryParams: {id: user.id, action: 'view'}});
          },
        error: () => this.warnMessage = 'Sorry. Something went wrong. Care to try again?'
        }
      )
    }
  }

  checkIfNameIsValid(): boolean {
    if (!this.formUser.name) {
      return this.nameIsValid = false;
    } else {
      return this.nameIsValid = this.formUser.name.trim().length > 0;
    }
  }

  checkIfPasswordIsValid(): boolean {
    if (!this.password) {
      this.passwordIsValid = false;
      return false;
    } else {
      return this.passwordIsValid = this.password.trim().length > 0;
    }
  }

  checkIfPasswordsMatch(): boolean {
    if (!this.password || !this.password2) {
      return this.passwordMatch = false;
    } else {
      return this.passwordMatch = this.password === this.password2;
    }
  }
}


