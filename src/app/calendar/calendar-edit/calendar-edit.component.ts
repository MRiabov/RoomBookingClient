import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

  selectedBooking!: Booking;
  rooms!: Array<Room>
  layouts = Object.values(Layout);
  users!: Array<User>
  selectedUser!: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.queryParams['id']; //snapshot makes it much easier(and faster). do this only on non-reloadable pages.
    let action = this.route.snapshot.queryParams['action']
    if (action==='edit') {
      this.dataService.getBooking(id).subscribe(
        receivedBooking => this.selectedBooking = receivedBooking
      )
    } else this.selectedBooking = new Booking();
    this.dataService.getRooms.subscribe(
      receivedRooms => this.rooms = receivedRooms
    )
    this.dataService.getUsers.subscribe(
      receivedUsers => this.users = receivedUsers
    )
  }

  updateBooking(booking: Booking) {
    if (booking.id) {

      this.dataService.updateBooking(booking).subscribe(
        () => this.router.navigate([''])
      );
    } else {
      this.dataService.addBooking(booking).subscribe(
        () => this.router.navigate([''])
      );
    }
    // this.router.navigate(['']);
  }

}
