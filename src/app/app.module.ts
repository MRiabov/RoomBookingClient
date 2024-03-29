import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {RoomsComponent} from './admin/rooms/rooms.component';
import {UsersComponent} from './admin/users/users.component';
import {CalendarComponent} from './calendar/calendar.component';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { CalendarEditComponent } from './calendar/calendar-edit/calendar-edit.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PrefetchRoomsService} from "./calendar/prefetch-rooms.service";
import {PrefetchUsersService} from "./calendar/prefetch-users.service";
import { LoginComponent } from './login/login.component';
import {AuthRouteGuardService} from "./auth-route-guard.service";

const routes: Routes = [
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthRouteGuardService]},
  {path: 'admin/rooms', component: RoomsComponent, canActivate: [AuthRouteGuardService]},
  {path: '', component: CalendarComponent},
  {path: 'edit', component: CalendarEditComponent, resolve: {rooms: PrefetchRoomsService, users: PrefetchUsersService},
    canActivate: [AuthRouteGuardService]},
  {path: '404', component: PageNotFoundComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/404'}
]


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RoomsComponent,
    UsersComponent,
    CalendarComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    CalendarEditComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
