import { Component, OnInit } from '@angular/core';
import {Account, Balance, Operation} from "../model";
import {switchMap, tap} from "rxjs";
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss']
})
export class EditOperationComponent implements OnInit {

  operation: Operation
  operationTypesMap: Map<string, string>
  operationTypesKeys: string[]
  operationType: string
  isTypeSelected = false
  balance: Balance
  fromAccount: Account
  toAccount: Account
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.operationTypesMap = this.dataService.getOperationTypes()
    this.operationTypesKeys = this.dataService.getOperationKeys()

    this.route.paramMap.pipe(
      switchMap(params =>
        this.dataService.getBalance(params.get('balanceId'))),
      tap(balance => this.balance = balance)
    )
      .subscribe()
  }

  selectType(event) {
    this.isTypeSelected = true
    this.operationType = event.target.value
  }

  selectFrom(event) {
    if(this.operationType === 'passive')
      this.fromAccount = this.getPassiveAccounts().find(el =>
        el.name == event.target.value)
    else
      this.fromAccount = this.getActiveAccounts().find(el =>
        el.name == event.target.value)
  }

  selectTo(event) {
    if(this.operationType === 'active')
      this.toAccount = this.getActiveAccounts().find(el =>
        el.name == event.target.value)
    else
      this.toAccount = this.getPassiveAccounts().find(el =>
        el.name == event.target.value)
  }

  getTypesKeys() {
    return this.operationTypesKeys
  }

  getType(key: string) {
    return this.operationTypesMap.get(key)
  }

  getActiveAccounts() {
    const activeAccounts = []
    this.balance?.accountsActive.forEach(account =>
      activeAccounts.push(account))
    return activeAccounts
  }

  getPassiveAccounts() {
    const passiveAccounts = []
    this.balance?.accountsPassive.forEach(account =>
      passiveAccounts.push(account))
    console.log(passiveAccounts)
    return passiveAccounts
  }

}
