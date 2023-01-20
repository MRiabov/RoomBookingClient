import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

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
    this.rooms = this.route.snapshot.data['rooms']
    this.users = this.route.snapshot.data['users']

    let id = +this.route.snapshot.queryParams['id']; //snapshot makes it much easier(and faster). do this only on non-reloadable pages.
    let action = this.route.snapshot.queryParams['action']
    if (action === 'edit') {
      this.dataService.getBooking(id)
        .pipe(
          map(booking => {
            const room = this.rooms.find(r => r.id === booking.room.id);
            booking.room = room ? room : new Room();
            const user = this.users.find(u => u.id === booking.user.id);
            booking.user = user ? user : new Room();
            return booking
          })
        )
        .subscribe(
          receivedBooking => this.selectedBooking = receivedBooking
        )
    } else this.selectedBooking = new Booking();

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
