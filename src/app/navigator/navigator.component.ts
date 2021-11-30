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
  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['type'] !== undefined){
          this.type = queryParam['type'];
          this.peopleService.getPeopleList();
        }
      });
    this.peopleSubscription = this.peopleService.peopleSubj.subscribe((data: PeopleModel[]) => {
      this.people = data;
    })
  }
  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
