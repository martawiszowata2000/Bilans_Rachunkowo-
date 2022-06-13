import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Account, Balance, Operation } from 'app/model';
import { DataService } from 'app/services/data.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {

  operationTypesMap: Map<string, string>
  operationTypesKeys: string[]
  isTypeSelected = false
  operationType: string
  balance: Balance
  selectedAccount: string
  hasErrors = false
  messageError: string
  fromAccount: Account
  toAccount: Account
  operation = new Operation()
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

  onSubmit() {
    if (!this.operation.to || !this.operation.from){
      this.hasErrors = true
      this.messageError = 'Musisz wybrać konta!'
    }
    else if (this.operation.from === this.operation.to) {
      this.hasErrors = true
      this.messageError = 'Nie można wybrać dwóch takich samych kont!'
    }
    else if ( +this.operation.amount <= 0){
      this.hasErrors = true
      this.messageError = 'Kwota musi być większa niż 0!'
    }
    else if(!this.operation.amount){
      this.hasErrors = true
      this.messageError = 'Musisz podać kwotę!'
    }
    else {
      this.operation.createdAt = new Date()
      this.dataService.addOperation(this.operation, this.balance._id).subscribe()
      setTimeout(() => {
        this.router.navigate([`balance/${this.balance._id}`])
        
      }, 3000);
    }
  }
}
