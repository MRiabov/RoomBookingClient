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

  displayedBookings?: Array<Booking>;

  selectedDate?: string;
  message = ''

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.message = 'Loading data...'
    this.loadData();
  }

  loadData() {
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date']
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB')
        }
        this.dataService.getBookingsByDate(this.selectedDate).subscribe({
            next: receivedBookings => {
              console.log(receivedBookings)
              this.displayedBookings = receivedBookings
            },
            error: err => this.message = 'Sorry, couldn`t GET your data. heh.'

          }
        )
      }
    )
  }

  onDateChange() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}})
  }

  editBooking(id: number) {
    this.router.navigate(['editBookingLoad'], {queryParams: {id: id, action: 'edit'}})
  }

  cancelBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe({
      next: () => this.loadData(),
      error: () => this.message = 'Sorry, something went wrong.'
    });
  }

  addBooking() {
    this.router.navigate(['edit'], {queryParams: {action: 'add'}})
  }

}
