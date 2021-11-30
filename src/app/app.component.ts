import {Component, OnInit} from '@angular/core';
import {PeopleService} from "./services/people.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private peopleService: PeopleService
  ) {
  }
  ngOnInit() {
    window.onload = () => {
      this.peopleService.navigateTo('listPage/navigator')
    };
  }
}
