import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PeopleService} from "../services/people.service";
import {PeopleModel} from "../models/people.model";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
  private querySubscription!: Subscription;
  type!: string
  peopleSubscription!: Subscription;
  people: PeopleModel[] = [];
  displayBlock = 'people';
  errorText = '';
  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.peopleSubscription = this.peopleService.peopleSubj.subscribe((data: PeopleModel[]) => {
      this.people = data;
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите сессию';
      this.displayBlock = 'errorInfo';
    })
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.type = queryParam['type'];
      }, error => {
        this.errorText = 'Произошла ошибка. Обновите сессию';
        this.displayBlock = 'errorInfo';
      });
  }
  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

  reload(){
    this.peopleService.getPeopleList();
  }

}
