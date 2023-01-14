import {Component, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // selectedBooking: Booking;
  displayedBookings: Array<Booking>;

  selectedDate: Date = new Date();

  constructor(private dataService: DataService,
              private router: Router) {
    this.displayedBookings = this.getBookingsByDate(this.selectedDate);
  }

  ngOnInit(): void {

  }


  set selectDate(date: Date) {
    this.selectedDate = date;
    this.displayedBookings = this.getBookingsByDate(date);
  }

  getBookingsByDate(date: Date): Array<Booking> {
    let result = new Array<Booking>;
    this.dataService.getBookingsByDate(date.getDate()).subscribe(
      receivedBookings => {
        result = receivedBookings;
      }
    )
    return result;
  }

  editBooking(id: number) {
    this.router.navigate(['edit'], {queryParams: {id: id}})
  }

}
