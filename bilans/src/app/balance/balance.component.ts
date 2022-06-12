import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Balance } from '../model';
import { DataService } from '../services/data.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  balance: Balance
  balanceId: string
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap( params => this.balanceId = params['balanceId']), //tutaj dodaje sie do parms
      switchMap( _ => this.dataService.getBalance(this.balanceId))
    ).subscribe( balance => {
      this.balance = balance
      console.log(this.balance)
      console.log(this.balance?.accountsActive)

    })
  }

  getBalanceName(){
    return this.balance?.name
  }

  getBalanceDate(){
    const date = new Date( this.balance.date)
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

  }

  getCurrency() {
    return this.balance?.currency
  }

  getActiveAccounts() {
    // console.log(this.balance?.accountsActive)
    return this.balance?.accountsActive
  }

  getPassiveAccounts() {
    // console.log(this.balance?.accountsPassive)
    return this.balance?.accountsPassive
  }

  getAccountPath(account: Account) {
    return `./account/${account['_id']}`
  }

  deleteBalance() {
    this.dataService.deleteBalance(this.balance).subscribe(_ =>
      this.router.navigate(['/list']) )

  }
}
