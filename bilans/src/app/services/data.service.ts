import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Balance, Operation } from "../model";

@Injectable({
    providedIn: 'root'
  })

export class DataService {
  constructor(private http: HttpClient) {}

  
  getOpList(): Observable<Operation[]> {
    return this.http.get<Operation[]>('http://localhost:5000/operation-item/');
  }

    getAccountBalanceList() {
        // for (const jsonObject in jsonResponse) {
        //     if (undefined !== jsonResponse[jsonObject].name && null !== jsonResponse[jsonObject].name) {
        //         console.log('name' + jsonResponse[jsonObject].name);
        //     }
        // }
    }
  getBalanceList(): Observable<Balance[]> {
    return this.http.get<Balance[]>('http://localhost:5000/balanceList/');
  }
  // getUsers(): Observable<any> {
  //   return this.http.get<any>('https://gorest.co.in/public/v2/users')
  // }
  // getUserPosts(): Observable<any> {
  //   return this.http.get<any>('https://gorest.co.in/public/v2/users/2511/posts')
  // }
}