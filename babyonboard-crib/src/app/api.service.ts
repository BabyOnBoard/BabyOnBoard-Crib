import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { Http, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class APIService {

  constructor(private http:HttpClient) { }


  getData(url):Observable<any>{
    return this.http.get(url);
  }

  setMovement(url, value, movement): void{

    var time = +value;
    let data = {
            "status": movement,
            "duration": time
          };
    let message = JSON.stringify(data);

    this.http.post(url, message, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe();
  }
}
