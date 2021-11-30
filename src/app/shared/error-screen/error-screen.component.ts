import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PeopleService} from "../../services/people.service";

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss']
})
export class ErrorScreenComponent implements OnInit, OnDestroy {
  private querySubscription!: Subscription;
  errorText = '';
  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.errorText = queryParam['errorText'];
      });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  reload(){
    this.peopleService.navigateTo('listPage/navigator')
  }

}
