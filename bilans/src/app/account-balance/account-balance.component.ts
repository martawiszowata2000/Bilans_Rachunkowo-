import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Operation } from 'app/model';
import { DataService } from 'app/services/data.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {

  account: Account
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => { return params.get('accountId')}),
      switchMap(id => this.dataService.getAccountById(id)),
      tap(account => this.account = account)
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
