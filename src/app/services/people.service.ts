import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";
import {ReplaySubject, Subject, Subscription} from "rxjs";
import {PeopleModel} from "../models/people.model";

@Injectable()
export class PeopleService{
  peopleSubscription!: Subscription;
  types: string[] = [''];
  typesSubj = new Subject<string[]>();
  peopleSubj = new ReplaySubject<PeopleModel[]>(1);
  displayBlock = new ReplaySubject<string>(1);
  errorText = new ReplaySubject<string>(1);
  constructor(
    private httpService: HttpService
  ) {
  }
  getPeopleList(){
    this.peopleSubscription = this.httpService.getPeopleData().subscribe((data: any) => {
      this.peopleSubj.next(data['data']);
      this.getTypes(data['data']);
    }, error => {
      this.displayBlock.next('errorInfo');
      this.errorText.next('Произошла ошибка. Обновите сессию');
    });
  }

  getTypes(data: PeopleModel[]){
    data.forEach(elem => this.types.indexOf(elem.type) === -1 ? this.types.push(elem.type) : null)
    this.types.sort((a: string, b: string) => a > b ? 1 : -1);
    this.typesSubj.next(this.types);
  }
}
