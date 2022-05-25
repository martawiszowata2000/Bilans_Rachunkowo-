import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    BalanceListComponent,
    AccountBalanceComponent,
    MainLayoutComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ng serve
