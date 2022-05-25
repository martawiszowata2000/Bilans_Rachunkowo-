import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Balance } from "../model";

@Injectable({
    providedIn: 'root'
  })

export class DataService {
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
}