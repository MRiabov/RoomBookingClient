import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {RoomsComponent} from './rooms/rooms.component';
import {UsersComponent} from './users/users.component';
import {CalendarComponent} from './calendar/calendar.component';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
  {path: 'admin/users', component: UsersComponent},
  {path: 'admin/rooms', component: RoomsComponent},
  {path: '', component: CalendarComponent},
  {path: '404', component: PageNotFoundComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
