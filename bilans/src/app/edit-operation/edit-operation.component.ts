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

  operation: Operation
  operationTypesMap: Map<string, string>
  operationTypesKeys: string[]
  operationType: string
  isTypeSelected = false
  balance: Balance
  fromAccount: Account
  toAccount: Account
  hasErrors = false
  messageError: string

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.operationTypesMap = this.dataService.getOperationTypes()
    this.operationTypesKeys = this.dataService.getOperationKeys()

    this.route.paramMap.pipe(
      switchMap(params =>
        this.dataService.getBalance(params.get('balanceId'))),
      tap(balance => this.balance = balance)
    )
      .subscribe()
    this.route.paramMap.pipe(
      map(params => { return params.get('operationId')}),
      switchMap(id => this.dataService.getOperationById(id)),
      tap(operation => {
        this.operation = operation
        this.dataService.getAccountById(this.operation.from).subscribe(acc => this.fromAccount = acc)
        this.dataService.getAccountById(this.operation.to).subscribe(acc => this.toAccount = acc)

      })
    ).subscribe()
  }

  selectType(event) {
    this.isTypeSelected = true
    this.operationType = event.target.value
  }

  selectFrom(event) {
    if (this.operationType === 'passive')
      this.fromAccount = this.getPassiveAccounts().find(el =>
        el.name == event.target.value)
    else
      this.fromAccount = this.getActiveAccounts().find(el =>
        el.name == event.target.value)
  }

  selectTo(event) {
    if (this.operationType === 'active')
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
      console.log(this.operation)
      this.router.navigate([`balance/${this.balance._id}`])
    }

  }
}
