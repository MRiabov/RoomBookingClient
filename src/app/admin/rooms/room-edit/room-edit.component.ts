import {Component, Input, OnInit} from '@angular/core';
import {Layout, Room} from "../../../model/Room";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  selectedRoom!: Room;

  layouts = Object.keys(Layout);

  layoutEnum = Layout;

  roomForm = this.formBuilder.group(
    {
      roomName: [this.selectedRoom.name, Validators.required],
      location: [this.selectedRoom.location, [Validators.required, Validators.minLength(2)]]
    }
  )

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {


    for (let layout of this.layouts) {
      // @ts-ignore
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(''))
      //   you are not going to use this in the project anyway... If anything, use 3rd code pack, chapter 09 closing workspace
    }
  }

  onSubmit(): void {
    if (this.roomForm.value['location'] && this.roomForm.controls['roomName'].value) {
      this.selectedRoom.name = this.roomForm.controls['roomName'].value;
      this.selectedRoom.location = this.roomForm.value['location']
    } else console.error("wtf? bruh where's validation?")

    for (const layout of this.layouts) {

    }
    console.log(this.selectedRoom);
    //todo save the rooms in dataservice
  }
}
