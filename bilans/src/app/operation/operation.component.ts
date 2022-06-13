import { Component, OnInit } from '@angular/core';
import {Account, Operation} from "../model";
import {map, retry, switchMap, tap} from "rxjs";
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  operation: Operation
  accountTo: Account
  accountFrom: Account
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => { return params.get('operationId')}),
      switchMap(id => this.dataService.getOperationById(id)),
      tap(operation => {
        this.operation = operation
        this.dataService.getAccountById(this.operation.from).subscribe(acc => this.accountFrom = acc)
        this.dataService.getAccountById(this.operation.to).subscribe(acc => this.accountTo = acc)

      })
    ).subscribe()

  }
  getOperationType(){
    switch (this.operation.operationType) {
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
    return new Date(this.operation.createdAt)
      .toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle:'short'})
  }

  deleteOperation(){
    this.dataService.deleteOperation(this.operation).subscribe( _ =>
      this.router.navigate(["../../"]))
  }

}
