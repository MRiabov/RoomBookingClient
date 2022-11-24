import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();

  get getRooms():Observable<Array<Room>>{
    return of(this.rooms);
  }

  get getUsers():Observable<Array<User>>{
    return of(this.users);
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
    this.rooms.push(room1, room2);
    this.users.push(
      new User(1, 'user1'),
      new User(2, 'user2'),
      new User(3,'user3')
    )
  }
}
