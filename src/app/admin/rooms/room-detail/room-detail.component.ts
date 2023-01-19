import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output()
  roomDeletedEvent = new EventEmitter();
  message = '';

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  editRoom(): void {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'edit', id: this.selectedRoom.id}})
  }

  deleteRoom(): void {
    if (!confirm('Are you sure you want to delete this room?')) return

    this.message = 'Deleting...'
    this.dataService.deleteRoom(this.selectedRoom.id).subscribe({
        next: () => {
          this.roomDeletedEvent.emit()
          this.router.navigate(['admin', 'rooms'])
        },
      error: () => {
          this.message = 'Sorry, this room can not be deleted.'
      }
      }
    )
  }

}
