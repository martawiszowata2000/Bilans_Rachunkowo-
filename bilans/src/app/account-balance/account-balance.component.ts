import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'app/model';
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
    private route: ActivatedRoute) { }

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

}
