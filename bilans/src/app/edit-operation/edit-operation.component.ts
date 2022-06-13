import { Component, OnInit } from '@angular/core';
import {Account, Balance, Operation} from "../model";
import {map, switchMap, tap} from "rxjs";
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss']
})
export class EditOperationComponent implements OnInit {

  operationTypesMap: Map<string, string>
  operationTypesKeys: string[]
  operationType: string
  isTypeSelected = false
  account: Account
  balance: Balance
  operation: Operation
  accountTo: Account
  accountFrom: Account
  hasErrors = false
  messageError: string
  accountId: string
  balanceId: string
  operationId: string

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => {
        this.accountId = params.get('accountId')
        this.balanceId = params.get('balanceId')
        this.operationId = params.get('operationId')
      }),
      switchMap(id => this.dataService.getBalance(this.balanceId)),
      tap(balance => {
        this.balance = balance
        this.account = this.balance.accountsActive.find(acc => acc._id === this.accountId) ||
          this.balance.accountsPassive.find(acc => acc._id === this.accountId)

        this.operation = this.account.credit.find(op => op._id === this.operationId) ||
          this.account.debit.find(op => op._id === this.operationId)

        this.accountFrom = this.balance.accountsActive.find(acc => acc._id === this.operation.from) ||
          this.balance.accountsPassive.find(acc => acc._id === this.operation.from)

        this.accountTo = this.balance.accountsActive.find(acc => acc._id === this.operation.to) ||
          this.balance.accountsPassive.find(acc => acc._id ===this.operation.to)
      })
    ).subscribe()
  }

  selectType(event) {
    this.isTypeSelected = true
    this.operationType = event.target.value
  }

  selectFrom(event) {
    if (this.operationType === 'passive')
      this.accountFrom = this.getPassiveAccounts().find(el =>
        el.name == event.target.value)
    else
      this.accountFrom = this.getActiveAccounts().find(el =>
        el.name == event.target.value)
  }

  selectTo(event) {
    if (this.operationType === 'active')
      this.accountTo = this.getActiveAccounts().find(el =>
        el.name == event.target.value)
    else
      this.accountTo = this.getPassiveAccounts().find(el =>
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

  getOperationDate(){
    return new Date(this.operation.createdAt)
      .toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle:'short'})
  }

  getOperationType(){
    switch (this.operation.operationType) {
      case 'active':
        return 'aktywna'
      case 'passive':
        return 'pasywna'
      case 'active_passive_up':
        return 'aktywno-pasywna zwiększająca'
      case 'active_passive_down':
        return 'aktywno-pasywna zmniejszająca'
      default:
        return 'typ operacji nieznany'
    }
  }

  onSubmit() {
    if (+this.operation.amount <= 0) {
      this.hasErrors = true
      this.messageError = 'Kwota musi być większa niż 0!'
    } else if (!this.operation.amount) {
      this.hasErrors = true
      this.messageError = 'Musisz podać kwotę!'
    } else {
      this.dataService.updateOperation(this.operation, this.balance._id).subscribe()
      this.router.navigate([`balance/${this.balance._id}`])
    }

  }
}
