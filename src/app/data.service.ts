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

  getBooking(id: number): Observable<Booking> {
    console.log('Got booking by Id')
    return this.http.get<Booking>(environment.restUrl + 'api/calendar/getById?id=' + id).pipe(
      map(data => Booking.fromHttp(data))
    )
  }

  getBookingsByDate(date: string): Observable<Array<Booking>> {
    console.log("bam!", date)
    return this.http.get<Array<Booking>>(environment.restUrl + "api/calendar/getByDate/" + date)
      .pipe(
        map(bookings => bookings.map(booking => Booking.fromHttp(booking)))
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + 'api/users/update', user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, password: password}
    return this.http.post<User>(environment.restUrl + 'api/users/save', fullUser);
  }

  addRoom(newRoom: Room): Observable<Room> {
    return this.http.post<Room>(environment.restUrl + 'api/rooms/save', newRoom);
  }

  updateRoom(newRoom: Room): Observable<Room> {
    return Observable.prototype;
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(environment.restUrl + 'api/users/' + userId)
  }

  resetPassword(userId: number): Observable<any> {
    return this.http.get(environment.restUrl + 'api/users/resetPassword' + userId)
  }

  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete(environment.restUrl + 'api/rooms/' + roomId)
  }

  addBooking(newBooking: Booking): Observable<any> {
    return this.http.post(environment.restUrl + 'api/calendar/add', newBooking)
  }

  updateBooking(newBooking: Booking) {
    return of(null)
  }

  deleteBooking(id: number) {
    return this.http.delete(environment.restUrl + 'api/calendar/' + id)
  }
}
