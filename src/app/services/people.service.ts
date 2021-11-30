import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";
import {ReplaySubject, Subject, Subscription} from "rxjs";
import {PeopleModel} from "../models/people.model";
import {Router} from "@angular/router";
import {QueryParamModel} from "../models/queryParam.model";

@Injectable()
export class PeopleService{
  peopleSubscription!: Subscription;
  types: string[] = [''];
  peopleList: PeopleModel[] = [];
  typesSubj = new Subject<string[]>();
  peopleSubj = new Subject<PeopleModel[]>();
  constructor(
    private httpService: HttpService,
    private router: Router
  ) {
  }
  getPeopleInfo(){
    this.peopleSubscription = this.httpService.getPeopleData().subscribe((data: any) => {
        this.peopleList = data['data']
        this.getTypes(data['data']);
    }, error => {
      this.navigateTo('errorScreen', { queryParams: { 'errorText': 'Произошла ошибка. Обновите сессию'}})
    });
  }
  getTypes(data: PeopleModel[]){
    data.forEach(elem => this.types.indexOf(elem.type) === -1 ? this.types.push(elem.type) : null)
    this.types.sort((a: string, b: string) => a > b ? 1 : -1);
    this.typesSubj.next(this.types);
  }
  getPeopleList(){
    this.peopleSubj.next(this.peopleList);
  }
  navigateTo(link: string, params: undefined | QueryParamModel = undefined){
    this.router.navigate([`/${link}`], params);
  }
  peopleListUnsubscribe(){
    this.peopleSubscription.unsubscribe();
  }
}
