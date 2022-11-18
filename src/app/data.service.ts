import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>


  constructor() {
    this.rooms = new Array<Room>()
    const room1 = new Room(1, 'First Room', 'First Floor', [
      new LayoutCapacity(1, Layout.THEATER, 50),
      new LayoutCapacity(2, Layout.BOARD, 20)
    ]);

    const room2 = new Room(1, 'First Room', 'First Floor', [
      new LayoutCapacity(1, Layout.THEATER, 50),
      new LayoutCapacity(2, Layout.BOARD, 20)
    ])
    this.rooms.push(room1,room2);

  }
}