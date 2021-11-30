import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PeopleService} from "../services/people.service";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  types: string[] = [];
  typesSubscription!: Subscription;
  displayBlock = 'wait';

  constructor(
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.peopleService.getPeopleInfo();

    this.typesSubscription = this.peopleService.typesSubj.subscribe((data: string[]) => {
      this.types = data;
      this.displayBlock = 'list';
    })
  }
  ngOnDestroy() {
    this.typesSubscription.unsubscribe();
    this.peopleService.peopleListUnsubscribe();
  }
}
