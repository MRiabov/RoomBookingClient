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


  get getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  get getUsers(): Observable<Array<User>> {
    return of(this.users);
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

  addRoom(newRoom: Room):Observable<Room> {
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

  deleteUser(userId:number): Observable<any>{
    for (let i = 0; i < this.users.length; i++){
      let user = this.users[i];
      if (user.id===userId) {
        this.users.splice(i,1)
      }
    }
    return of(null);
  }

  resetPassword(userId: number): Observable<any>{
    return of(null);
  }

  deleteRoom(roomId:number): Observable<any>{
    for (let i = 0; i < this.rooms.length; i++){
      let room = this.rooms[i];
      if (room.id===roomId) {
        this.users.splice(i,1)
      }
    }
    return of(null)
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
      new User(3, 'user3')
    )
  }
}
