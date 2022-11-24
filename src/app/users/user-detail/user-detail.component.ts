import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/User";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input()
  selectedUser!: User;

  constructor() {
  }

}
