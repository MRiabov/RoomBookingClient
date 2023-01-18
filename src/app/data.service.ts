import {Injectable} from '@angular/core';
import {Room} from "./model/Room";
import {User} from "./model/User";
import {map, Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    console.log(environment.restUrl)
  }

  get getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + 'api/rooms/getAll').pipe(
      map(array => {
        return array.map((value) => Room.mapToRoom(value))
      })
    )
  }

  get getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + 'api/users/getAll').pipe(
      map(array => {
        return array.map((value) => User.mapToUser(value))
      })
    )
  }

  get getBookings(): Observable<Array<Booking>> {
    return Observable.prototype;
  }

  getBooking(id: number): Observable<Booking> {
    return Observable.prototype;

  }

  getBookingsByDate(date: string): Observable<Array<Booking>> {
    return Observable.prototype;
  }

  updateUser(user: User): Observable<User> {
    return Observable.prototype;
  }

  addUser(newUser: User, password: string): Observable<User> {
    return Observable.prototype;
  }

  addRoom(newRoom: Room): Observable<Room> {
    return Observable.prototype;

  }

  updateRoom(newRoom: Room): Observable<Room> {
    return Observable.prototype;

  }

  deleteUser(userId: number): Observable<any> {
    return of(null);
  }

  resetPassword(userId: number): Observable<any> {
    return of(null);
  }

  deleteRoom(roomId: number): Observable<any> {
    return of(null);
  }

  addBooking(newBooking: Booking): Observable<any> {
    return of(null);
  }

  updateBooking(newBooking: Booking) {
    return of(null);
  }

  deleteBooking(id: number) {
    return of(null);
  }


}
