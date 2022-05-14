import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-account-balance-list',
  templateUrl: './account-balance-list.component.html',
  styleUrls: ['./account-balance-list.component.scss']
})
export class AccountBalanceListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.startUpload()
  }

}
