import { Component, OnInit } from '@angular/core';
import {Account, Balance, Operation} from "../model";
import {map, retry, switchMap, tap} from "rxjs";
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  account: Account
  balance: Balance
  operation: Operation
  accountTo: Account
  accountFrom: Account
  accountId: string
  balanceId: string
  operationId: string

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  getOperationType(){
    switch (this.operation?.operationType) {
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
  getOperationDate(){
    return new Date(this.operation?.createdAt)
      .toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle:'short'})
  }



  deleteOperation(){
    this.dataService.deleteOperation(this.balance, this.account, this.operation).subscribe( _ =>
      this.router.navigate(["../../"]))
  }

  getOperationAmount() {
    return this.operation?.amount
  }

  getFromName() {
    return this.accountFrom?.name
  }
  
  getToName() {
    return this.accountTo?.name
  }
}
