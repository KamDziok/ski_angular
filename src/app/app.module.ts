import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnloginComponent } from './unlogin/unlogin.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminCompanyListComponent } from './admin-company-list/admin-company-list.component';
import { AdminProducerListComponent } from './admin-producer-list/admin-producer-list.component';
import { AdminSkiListComponent } from './admin-ski-list/admin-ski-list.component';
import { AdminOfferSkiListComponent } from './admin-offer-ski-list/admin-offer-ski-list.component';
import { AdminTransactionListComponent } from './admin-transaction-list/admin-transaction-list.component';
import { SerchOfferSkiComponent } from './serch-offer-ski/serch-offer-ski.component';
import { CompanyAddProducerComponent } from './company-add-producer/company-add-producer.component';
import { CompanyAddSkiComponent } from './company-add-ski/company-add-ski.component';
import { CompanyAddOfferSkiComponent } from './company-add-offer-ski/company-add-offer-ski.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { MyTransactionComponent } from './my-transaction/my-transaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { CompanyTransactionComponent } from './company-transaction/company-transaction.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    UnloginComponent,
    LoginComponent,
    AdminComponent,
    CompanyComponent,
    HomeComponent,
    AdminUserListComponent,
    AdminCompanyListComponent,
    AdminProducerListComponent,
    AdminSkiListComponent,
    AdminOfferSkiListComponent,
    AdminTransactionListComponent,
    SerchOfferSkiComponent,
    CompanyAddProducerComponent,
    CompanyAddSkiComponent,
    CompanyAddOfferSkiComponent,
    MyAccountComponent,
    MyOrderComponent,
    CreateCompanyComponent,
    MyTransactionComponent,
    ProfileCompanyComponent,
    CompanyTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
