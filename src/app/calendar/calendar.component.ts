import {Component, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  displayedBookings!: Array<Booking>;

  selectedDate!: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date']
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB')
        }
        this.dataService.getBookingsByDate(this.selectedDate).subscribe(
          receivedBookings => this.displayedBookings = receivedBookings
        )
      }
    )
  }

  getBookings(): Array<Booking> {
    let result = new Array<Booking>;
    this.dataService.getBookings/*(date.getDate())*/.subscribe(
      receivedBookings => {
        result = receivedBookings;
      }
    )
    return result;
  }

  onDateChange() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}})
  }

  editBooking(id: number) {
    this.router.navigate(['edit'], {queryParams: {id: id, action: 'edit'}})
  }

  cancelBooking(id: number) {
    this.dataService.deleteBooking(id);
  }

  addBooking() {
    this.router.navigate(['edit'], {queryParams: {action: 'add'}})
  }

}
