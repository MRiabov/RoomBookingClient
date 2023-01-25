import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>()
  jwtToken!: string;

  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe({
      next: value => {
        this.jwtToken = value.result;
        console.log("Authenticated!")
        console.log(value)
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true)
      },
      error: err => {
        this.isAuthenticated = false
        this.authenticationResultEvent.emit(false)
      }
    })
  }

  get getRole(): string {
    if (this.jwtToken == null) {
      return '';
    }
    const encodedPayload= this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }

}
