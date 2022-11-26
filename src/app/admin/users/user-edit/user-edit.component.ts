import {Component, Input, OnInit} from '@angular/core';
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

  formUser!: User;

  warnMessage: string = '';

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.selectedUser);
  }

  onSubmit() {
    console.log("Success!",this.formUser.id,this.formUser.id)
    this.dataService.updateUser(this.formUser).subscribe(
      user => {
        this.router.navigate(['admin', 'users'], {queryParams: {id: user.id, action: 'view'}});
      }
    )
  }
}


