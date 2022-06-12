import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, Balance } from 'app/model';
import { DataService } from 'app/services/data.service';
import { catchError, of, tap } from 'rxjs';



@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class AddBalanceComponent implements OnInit {

  isTypeSelected = false
  balance = new Balance()
  activeAccounts: Account[]
  passiveAccounts: Account[]
  areTotalsDifferent = false
  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getSchema().subscribe(balance => {
      console.log(balance)
      this.balance = balance
      this.balance.name = ''
      this.balance.currency = ''
    })
  }

  getActiveAccounts(){
    return this.balance?.accountsActive
  }

  getPassiveAccounts(){
    return this.balance?.accountsPassive
  }

  onSubmit(){
    this.dataService.addBalance(this.balance).pipe(
      catchError(err => of(`${err}`)),
      tap(res => {
        if(res['error'] === 'Totals are different') 
          this.areTotalsDifferent = true
      })
    )
    .subscribe(res => {
      if(res['error'] !== "Totals are different")
        this.router.navigate([`/balance/${res}`])
    })
  }
}
