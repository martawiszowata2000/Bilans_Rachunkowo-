import { Component, OnInit } from '@angular/core';
import { Balance } from '../model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss']
})
export class BalanceListComponent implements OnInit {
  balanceList: Array<Balance> = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBalanceList().subscribe(balanceList => {
      this.balanceList = balanceList
    })
  }

  getPath(balance: Balance) {
    return `../balance/${balance['_id']}`
  }



}
