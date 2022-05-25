import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  { path: '', redirectTo:'home/list', pathMatch: 'full'},
  { path: 'home', component: MainLayoutComponent,
    children: [
      { path: 'list', component: BalanceListComponent },
      { path: 'balance/:balanceId', component: BalanceComponent },
      { path: 'account_balance/:ABid', component: AccountBalanceComponent },
    ] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
