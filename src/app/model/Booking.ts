import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  id!: number;
  room!: Room;
  user!: User;
  layout!: Layout;
  title!: string;
  date!: string;
  startTime!: string;
  endTime!: string;
  participants!: number;

  getDateAsDate(): Date {
    if (this.date) return new Date(this.date);
    else return new Date();
  }


  constructor(id?: number, room?: Room, user?: User, layout?: Layout, title?: string, date?: string, startTime?: string, endTime?: string, participants?: number) {
    if (id) this.id = id
    if (room) this.room = room
    if (user) this.user = user
    if (layout) this.layout = layout
    if (title) this.title = title
    if (date) this.date = date
    if (startTime) this.startTime = startTime
    if (endTime) this.endTime = endTime
    if (participants) this.participants = participants;
  }

  static fromHttp(unprocessedBooking: Booking) {
    return new Booking(
      unprocessedBooking.id,
      unprocessedBooking.room,
      unprocessedBooking.user,
      unprocessedBooking.layout,
      unprocessedBooking.title,
      unprocessedBooking.date,
      unprocessedBooking.startTime,
      unprocessedBooking.endTime,
      unprocessedBooking.participants)

  }
}
