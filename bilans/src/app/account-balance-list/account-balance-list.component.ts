import { Component, OnInit } from '@angular/core';
import { Balance, Operation } from '../model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-account-balance-list',
  templateUrl: './account-balance-list.component.html',
  styleUrls: ['./account-balance-list.component.scss']
})
export class AccountBalanceListComponent implements OnInit {
  opList: Array<Balance> = []

  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.getUsers().subscribe(op => {
    //   this.opList = op
    //   console.log(this.opList)
    // })  
    // this.dataService.getUserPosts().subscribe(op => {
    //   this.opList = op
    //   console.log(this.opList)
    // })  }
    this.dataService.getBalanceList().subscribe(op => {
      this.opList = op
      console.log(this.opList)
    })  }
    // this.dataService.getOpList().subscribe(op => {
    //   this.opList = op
    //   console.log(this.opList)
    // })  }

}
