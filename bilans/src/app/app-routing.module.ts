import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBalanceListComponent } from './account-balance-list/account-balance-list.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo:'home/list', pathMatch: 'full'},
  { path: 'home', component: MainLayoutComponent,
    children: [
      { path: 'list', component: AccountBalanceListComponent },
      { path: 'account_balance/:ABid', component: AccountBalanceComponent },
    ] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
