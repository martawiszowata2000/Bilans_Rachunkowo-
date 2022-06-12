import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { BalanceComponent } from './balance/balance.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import {AddBalanceComponent} from "./add-balance/add-balance.component";
import { OperationComponent } from './operation/operation.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BalanceListComponent },
  { path: 'balance/:balanceId', component: BalanceComponent },
  { path: 'list/newBalance', component: AddBalanceComponent },
  { path: 'balance/:balanceId/update', component: AddBalanceComponent},
  { path: 'balance/:balanceId/delete', component: AddBalanceComponent},
  { path: 'balance/:balanceId/newOperation', component: AddOperationComponent },
  { path: 'balance/:balanceId/account/:accountId', component: AccountBalanceComponent },
  { path: 'balance/:balanceId/account/:accountId/operation/:operationId', component: OperationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
