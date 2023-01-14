import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

  selectedBooking!: Booking;
  rooms!: Array<Room>
  layouts = Object.keys(Layout);
  users!: Array<User>

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id: number;
    this.route.queryParams.subscribe(
      params =>
        this.dataService.getBookings.subscribe(
          receivedBookings => {
            const foundBooking = receivedBookings.find(booking => booking.id === +params['id']);
            if (foundBooking != null) this.selectedBooking = foundBooking;
          }
        )
    )
    this.dataService.getRooms.subscribe(
      receivedRooms => this.rooms = receivedRooms
    )
    this.dataService.getUsers.subscribe(
      receivedUsers => this.users = receivedUsers
    )
  }

  updateBooking(booking: Booking) {
    if (booking.id) {
      this.dataService.addBooking(booking);
    } else {
      this.dataService.updateBooking(booking);
    }
  }

}
