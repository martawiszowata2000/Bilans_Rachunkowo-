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
import { AddOperationComponent } from './add-operation/add-operation.component';
import { FormsModule } from '@angular/forms';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input"


@NgModule({
  declarations: [
    AppComponent,
    BalanceListComponent,
    AccountBalanceComponent,
    MainLayoutComponent,
    BalanceComponent,
    AddOperationComponent,
    AddBalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ng serve
