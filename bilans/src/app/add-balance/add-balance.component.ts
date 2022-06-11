import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Balance } from 'app/model';
import { DataService } from 'app/services/data.service';



@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class AddBalanceComponent implements OnInit {

  isTypeSelected = false
  // date
  balance = new Balance()
  activeAccounts: Account[]
  passiveAccounts: Account[]
  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataService.getSchema().subscribe(balance => {
      console.log(balance)
      this.balance = balance
      this.balance.name = ''
    })
  }

  getActiveAccounts(){
    return this.balance?.accountsActive
  }

  getPassiveAccounts(){
    return this.balance?.accountsPassive
  }

  onSubmit(){
    this.dataService.addBalance(this.balance).subscribe(
    )
  }

  deleteBalance(){
    this.dataService.deleteBalance(this.balance).subscribe()
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
