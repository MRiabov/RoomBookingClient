import {Component, OnInit} from '@angular/core';
import {User} from "../model/User";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser!: User;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
    this.users = dataService.users;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        const id = +params['id'];
        if (id) { // @ts-ignore
          this.selectedUser = this.users.find(user => user.id === id)
        }
      }
    )
  }

  selectUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id}})
  }

}
