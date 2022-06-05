import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Account, Balance } from 'app/model';
import { DataService } from 'app/services/data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {

  operationTypes: Map<string, string>
  isTypeSelected = false
  operationType: string
  balance: Balance
  fromAccount: Account
  toAccount: Account
  constructor(private dataService: DataService,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.operationTypes = this.dataService.getOperationTypes()
    this.route.paramMap.pipe(
      switchMap(params => 
        this.dataService.getBalance(params.get('balanceId')))
    )
    .subscribe(balance =>
      this.balance = balance
    )
  }

  selectType(event) {
    this.isTypeSelected = true
    this.operationType = event.target.value
  }

  selectFrom(event) {
    if(this.operationType === 'passive')
      this.fromAccount = this.getPassiveAccounts().find(el => 
        el.name == event.target.value)
    else
      this.fromAccount = this.getActiveAccounts().find(el => 
        el.name == event.target.value)
  }

  selectTo(event) {
    if(this.operationType === 'active')
      this.toAccount = this.getActiveAccounts().find(el => 
        el.name == event.target.value)
    else
      this.toAccount = this.getPassiveAccounts().find(el => 
        el.name == event.target.value)

    console.log(this.fromAccount)
    console.log(this.toAccount)
  }

  getTypesEntries() {
    return this.operationTypes?.entries()
  }

  getActiveAccounts() {
    const activeAccounts = []
    this.balance.accountsActive.forEach(account =>
      activeAccounts.push(account))
    return activeAccounts
  }

  getPassiveAccounts() {
    const passiveAccounts = []
    this.balance.accountsPassive.forEach(account =>
      passiveAccounts.push(account))
    return passiveAccounts
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
  }
}
