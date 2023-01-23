import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>
  selectedRoom!: Room;
  action!: string;
  pageLoading = true;
  errorMessage = 'Please wait... getting the list of rooms.'
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getRooms(this.authService.jwtToken).subscribe({
        next: (next) => {
          this.rooms = next;
          this.pageLoading = false;
          this.processData()
        },
        error: err => {
          if (err.status === 402) {
            this.errorMessage = 'Sorry, you must pay to use this application!'
          } else {
            this.errorMessage = 'Sorry, something went wrong. 😳😳😳 Trying again... Please';
            if (this.reloadAttempts < 10) {
              this.reloadAttempts++;
              this.loadData();
            } else {
              this.errorMessage = 'Seems the backend is down😳😳😳';
            }
          }
        }
      }
    )
  }

  processData(){
    this.route.queryParams.subscribe(
      params => {
        const id = params['id']
        this.action = params['action']
        if (id) { // @ts-ignore
          this.selectedRoom = this.rooms.find(room => room.id === +id)
        }
        if (params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
        }
      }
    )

  }

  setSelectedRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id: id, action: 'view'}});
  }

  addRoom() {
    this.selectedRoom = new Room(undefined,"123");
    console.log(this.selectedRoom);
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'add'}})
  }
}
