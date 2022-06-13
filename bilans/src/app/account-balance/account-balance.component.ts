import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Balance, Operation } from 'app/model';
import { DataService } from 'app/services/data.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {

  account: Account
  balance: Balance
  accountId: string
  balanceId: string
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => { 
        this.accountId = params.get('accountId')
        this.balanceId = params.get('balanceId')
      }),
      switchMap(id => this.dataService.getBalance(this.balanceId)),
      tap(balance => { 
        this.balance = balance
        this.account = this.balance.accountsActive.find(acc => acc._id === this.accountId) ||
          this.balance.accountsPassive.find(acc => acc._id === this.accountId)
      })
    ).subscribe()
  }

  getAccountName() {
    return this.account?.name
  }

  getAccountBalance() {
    return this.account?.balance
  }

  getAccountInitialBalance(){
    return this.account?.initialBalance
  }

  getOperationsCredit() {
    return this.account?.credit
  }

  getOperationsDebit() {
    return this.account?.debit
  }

  getOperationAmount(operation: Operation) {
    return operation.amount
  }

  getOperationDate(operation: Operation) {
    return new Date(operation.createdAt)
      .toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle:'short'})
  }

  goToOperationDetails(operation: Operation) {
    this.router.navigate(
      [`./operation/${operation._id}`],
      {
        relativeTo: this.route
      }
    )
  }

}
