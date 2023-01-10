import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  selectedUser!: User;
  action!: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataService.getUsers.subscribe(
      next => this.users = next
    );
    //queryParams are parameters of the query, something that goes after ? in link, like google.com/find?id=3&action=view
    this.route.queryParams.subscribe(
      params => {
        const id = +params['id'];//plus converts it to number
        this.action = params['action'];//we query element in array by string...
        if (id) { // @ts-ignore
          this.selectedUser = this.users.find(user => user.id === id);
        }
      }
    )
  }

  selectUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id: id, action: 'view'}});
  }

  addUser() {
    // @ts-ignore
    this.selectedUser = new User();
    this.router.navigate(['admin','users'], {queryParams: {action: 'add'}})
  }

}
