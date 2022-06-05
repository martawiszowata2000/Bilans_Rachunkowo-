import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BalanceComponent } from './balance/balance.component';
import { AddOperationComponent } from './add-operation/add-operation.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BalanceListComponent },
  { path: 'balance/:balanceId', component: BalanceComponent },
  { path: 'balance/:balanceId/newOperation', component: AddOperationComponent },
  { path: 'balance/:balanceId/account/:accountId', component: AccountBalanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
