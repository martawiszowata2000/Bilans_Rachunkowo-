import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account, Balance, Operation } from "../model";

@Injectable({
    providedIn: 'root'
  })

export class DataService {

  private operationTypesMap = new Map<string, string>([
    ['active', 'aktywna'],
    ['passive', 'pasywna'],
    ['active_passive_up', 'aktywno-pasywna zwiększająca'],
    ['active_passive_down', 'aktywno-pasywna zmniejszająca'],
  ])

  private operationTypesKeys = [
    'active',
    'passive',
    'active_passive_up',
    'active_passive_down',
  ]

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

  getSchema(): Observable<Balance>{
    return this.http.get<Balance>(this.url(`balanceList/getSchema`))
  }

  addBalance(balance: Balance): Observable<string> {
    return this.http.post<string>(this.url(`balanceList/add`), balance)
  }

  // updateBalance(balance: Balance): Observable<Balance>{
  //   return this.http.put<Balance>(this.url(`balanceList/${balance._id}`), balance)
  // }

  deleteBalance(balance: Balance): Observable<string>{
    return this.http.delete<string>(this.url(`balanceList/delete/${balance._id}`))
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(this.url(`accounts/${id}`))
  }

  addOperation(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(this.url(`operations/add`), operation)
  }

  getOperationTypes() {
    return this.operationTypesMap
  }

  getOperationKeys() {
    return this.operationTypesKeys
  }

}
