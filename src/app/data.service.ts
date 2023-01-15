import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();
  private bookings: Array<Booking> = new Array<Booking>();


  get getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  get getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  get getBookings(): Observable<Array<Booking>> {
    return of(this.bookings);
  }

  getBooking(id: number): Observable<Booking> {
    const foundBooking = this.bookings.find(booking => booking.id === id);
    if (foundBooking) return of(foundBooking)
    else return Observable.prototype;
  }

  getBookingsByDate(date: string): Observable<Array<Booking>> {
    const result = new Array<Booking>;
    for (let booking of this.bookings) {
      if (booking.date === date) {
        result.push(booking);
      }
    }
    return of(result);
  }

  updateUser(user: User): Observable<User> {
    console.log("this is executed", user.id)
    let originalUser =
      this.users.find(u => user.id === u.id);
    if (originalUser == null) {
      return Observable.prototype;
    }
    originalUser.name = user.name;
    console.log(originalUser.name)
    return of(originalUser);
  }

  addUser(newUser: User, password: string): Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) id = user.id;
    }//find the highest id. We shouldn't care with JPA, right?...
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  addRoom(newRoom: Room): Observable<Room> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) id = user.id;
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom)
  }

  updateRoom(newRoom: Room): Observable<Room> {
    let originalRoom = this.rooms.find(oldRoom => newRoom.id === oldRoom.id);
    if (originalRoom == null) {
      return Observable.prototype;
    }
    originalRoom.name = newRoom.name;
    originalRoom.location = newRoom.location;
    originalRoom.capacities = newRoom.capacities;
    return of(originalRoom);
  }

  deleteUser(userId: number): Observable<any> {
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.id === userId) {
        this.users.splice(i, 1)
      }
    }
    return of(null);
  }

  resetPassword(userId: number): Observable<any> {
    return of(null);
  }

  deleteRoom(roomId: number): Observable<any> {
    for (let i = 0; i < this.rooms.length; i++) {
      let room = this.rooms[i];
      if (room.id === roomId) {
        this.users.splice(i, 1)
      }
    }
    return of(null)
  }

  addBooking(newBooking: Booking) : Observable<any> {
    newBooking.id = this.bookings.length + 1;
    this.bookings.push(newBooking);
    console.log(this.bookings)
    return of(null);
  }

  updateBooking(newBooking: Booking) {
    let originalBooking = this.bookings.find(u => newBooking.id === u.id);
    if (originalBooking == null) {
      return Observable.prototype;
    } else originalBooking = newBooking;
    return of(originalBooking);
  }

  deleteBooking(id: number) {
    let deletePos = 0;
    for (let i = 0; i < this.bookings.length; i++) {
      const booking = this.bookings[i];
      if (booking.id === id) {
        deletePos = i;
        break;
      }
    }
    this.bookings.splice(deletePos,1);
  }

  constructor() {
    const room1 = new Room(1, 'First room', 'First floor', [
      new LayoutCapacity(1, Layout.THEATER, 50),
      new LayoutCapacity(2, Layout.BOARD, 20)
    ]);

    const room2 = new Room(2, 'Second room', 'Third floor', [
      new LayoutCapacity(1, Layout.THEATER, 50),
      new LayoutCapacity(2, Layout.BOARD, 20)
    ])
    let user1 = new User(1, 'user1')
    let user2 = new User(2, 'user2')
    let user3 = new User(3, 'user3')

    this.rooms.push(room1, room2);
    this.users.push(user1, user2, user3);

    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.participants = 5;

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }


}
