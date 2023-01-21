import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  password!: string;
  name!: string;

  constructor(private authService: AuthService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.authenticate(this.name, this.password)
    const url = this.route.snapshot.queryParams['requested'];
    console.log(url)
    this.router.navigateByUrl(url)
  }

}
