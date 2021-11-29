import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PeopleService} from "../services/people.service";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  types: string[] = [];
  active = 0;
  typesSubscription!: Subscription;
  displayBlock = 'wait';
  displayBLockSubscription!: Subscription;
  errorText = '';
  errorTextSubscription!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.typesSubscription = this.peopleService.typesSubj.subscribe((data: string[]) => {
      this.types = data;
      setTimeout(()=>{this.displayBlock = 'list';}, 2000)
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите сессию';
      this.displayBlock = 'errorInfo';
    })
    this.displayBLockSubscription = this.peopleService.displayBlock.subscribe((data: string) => {
      this.displayBlock = data;
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите сессию';
      this.displayBlock = 'errorInfo';
    })
    this.errorTextSubscription = this.peopleService.errorText.subscribe((data: string) => {
      this.errorText = data;
    }, error => {
      this.errorText = 'Произошла ошибка. Обновите сессию';
      this.displayBlock = 'errorInfo';
    })
  }
  ngOnDestroy() {
    this.typesSubscription.unsubscribe();
    this.displayBLockSubscription.unsubscribe();
    this.errorTextSubscription.unsubscribe();
  }

  reload(){
    this.peopleService.getPeopleList();
  }
}
