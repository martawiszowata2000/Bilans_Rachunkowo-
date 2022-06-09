import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Balance, Operation } from 'app/model';
import { DataService } from 'app/services/data.service';
import {tap} from "rxjs";
// import {active} from '../../../balance-sample/activeOp';
// import {passive} from '../../../balance-sample/passiveOp';
// import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class AddBalanceComponent implements OnInit {

  isTypeSelected = false
  // date
  balance: Balance
  activeAccounts: Account[]
  passiveAccounts: Account[]
  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  this.dataService.addBalance().subscribe(
    balance => this.balance = balance
  )

  }

  getActiveAccounts(){
    return this.balance?.accountsActive
  }

  getPassiveAccounts(){
    return this.balance?.accountsPassive
  }

  onSubmit(balanceId){
    this.dataService.updateBalance(balanceId).subscribe(
    )
  }
}


// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };
