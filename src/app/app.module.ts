import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPageComponent } from './list-page/list-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import { NavigatorComponent } from './navigator/navigator.component';
import {PeopleService} from "./services/people.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ErrorScreenComponent } from './shared/error-screen/error-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    NavigatorComponent,
    ErrorScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbNavModule,
    NgbModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
