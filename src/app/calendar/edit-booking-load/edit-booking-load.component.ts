import {Component, OnInit} from '@angular/core';
import {EditBookingDataService} from "../../edit-booking-data.service";

@Component({
  selector: 'app-edit-booking-load',
  templateUrl: './edit-booking-load.component.html',
  styleUrls: ['./edit-booking-load.component.css']
})
export class EditBookingLoadComponent implements OnInit {

  constructor(private editBookingDataService: EditBookingDataService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000)
  }

  navigateWhenReady() {
    if (this.editBookingDataService.dataLoaded === 2) {

    } else {

    }
    setTimeout(() => this.navigateWhenReady(), 500)
  }

}
