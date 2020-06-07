import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnloginComponent } from './unlogin/unlogin.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SupportComponent } from './support/support.component';
import { CompanyComponent } from './company/company.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegiComponent } from './form-regi/form-regi.component';
import { FormRegiCompanyComponent } from './form-regi-company/form-regi-company.component';
import { FormLoginCompanyComponent } from './form-login-company/form-login-company.component';
import { HomeComponent } from './home/home.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminCompanyListComponent } from './admin-company-list/admin-company-list.component';
import { AdminUnitListComponent } from './admin-unit-list/admin-unit-list.component';
import { AdminPriceListComponent } from './admin-price-list/admin-price-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UnloginComponent,
    LoginComponent,
    AdminComponent,
    SupportComponent,
    CompanyComponent,
    FormLoginComponent,
    FormRegiComponent,
    FormRegiCompanyComponent,
    FormLoginCompanyComponent,
    HomeComponent,
    AdminUserListComponent,
    AdminCompanyListComponent,
    AdminUnitListComponent,
    AdminPriceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
