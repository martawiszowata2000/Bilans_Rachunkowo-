import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account, Balance } from "../model";

@Injectable({
    providedIn: 'root'
  })

export class DataService {

  private operationTypes = new Map<string, string>([
    ['active', 'aktywna'],
    ['passive', 'pasywna'],
    ['active_passive_up', 'aktywno-pasywna zwiększająca'],
    ['active_passive_down', 'aktywno-pasywna zmniejszająca'],
  ])

  constructor(private http: HttpClient) {}

  private url(path: string) {
    return `http://localhost:5000/${path}`
  }

  getBalanceList(): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.url('balanceList/'))
  }
  
  getBalance(id: string): Observable<Balance> {
    return this.http.get<Balance>(this.url(`balanceList/${id}`))
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(this.url(`accounts/${id}`))
  }

  getOperationTypes() {
    return this.operationTypes
  }

  //do bsk
  addUser(): Observable<any> {
    const user = {
      name: 'USER',
      email: 'user12345@gmail.com',
      gender: 'female',
      status: 'active'
    }

    const options = 
    { headers: new HttpHeaders({
        AccessToken: 'Bearer 498a4282082b3275e2e065f4f00f95148dd44b740ecfe5831b8e4f1e1a18f9eb'
      })
    }
    return this.http.post<any>('https://gorest.co.in/public/v2/users', user, options)
  }
}