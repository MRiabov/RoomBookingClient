import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  password!: string;
  name!: string;
  subscription!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          const url = this.route.snapshot.queryParams['requested'];
          console.log(url)
          this.router.navigateByUrl(url)
        } else {
          this.message = 'Your username or password were not recognized. Please try again.'
        }
      }
    )
  }

  onSubmit(): void {
    this.authService.authenticate(this.name, this.password)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
