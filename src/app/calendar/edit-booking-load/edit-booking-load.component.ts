import {Component, OnInit} from '@angular/core';
import {EditBookingDataService} from "../../edit-booking-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-booking-load',
  templateUrl: './edit-booking-load.component.html',
  styleUrls: ['./edit-booking-load.component.css']
})
export class EditBookingLoadComponent implements OnInit {

  constructor(private editBookingDataService: EditBookingDataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000)
  }

  navigateWhenReady() {
    console.log("amend pressed")
    if (this.editBookingDataService.dataLoaded === 2) {
      const id = this.route.snapshot.queryParams['id']
      const action = this.route.snapshot.queryParams['action']
      this.router.navigate(['edit'],
        {queryParams: (action === 'edit') ? {id: id, action: 'edit'} : {action: 'add'}})
    } else {
      setTimeout(() => this.navigateWhenReady(), 500)
    }
  }

}
