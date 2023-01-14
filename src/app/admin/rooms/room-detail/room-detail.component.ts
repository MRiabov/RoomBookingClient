import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  selectedRoom!: Room

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  editRoom(): void {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'edit', id: this.selectedRoom.id}})
  }

  deleteRoom(): void {
    this.dataService.deleteRoom(this.selectedRoom.id).subscribe(
      () => this.router.navigate(['admin','rooms'])
    )
  }

}
