import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PeopleService} from "./services/people.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private router: Router,
    private peopleService: PeopleService
  ) {
  }
  ngOnInit() {
    window.onload = () => {
      this.router.navigate(['/navigator']);
    };
    this.peopleService.getPeopleList();
  }

}
