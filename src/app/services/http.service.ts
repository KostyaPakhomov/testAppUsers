import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PeopleModel} from "../models/people.model";
import {Observable} from "rxjs";

@Injectable()
export class HttpService{
  constructor(
    private http: HttpClient
  ) {
  }
  getPeopleData(): Observable<any>{
    return this.http.get('../../assets/data/db.json');
  }
}
