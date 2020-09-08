import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerchOfferSkiComponent } from './serch-offer-ski/serch-offer-ski.component';
import { UnloginComponent } from './unlogin/unlogin.component';
import { HomeComponent } from './home/home.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegiComponent } from './form-regi/form-regi.component';
import { FormLoginCompanyComponent } from './form-login-company/form-login-company.component';
import { FormRegiCompanyComponent } from './form-regi-company/form-regi-company.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminCompanyListComponent } from './admin-company-list/admin-company-list.component';
import { AdminUnitListComponent } from './admin-unit-list/admin-unit-list.component';
import { AdminPriceListComponent } from './admin-price-list/admin-price-list.component';
import { AdminNotificationCompanyListComponent } from './admin-notification-company-list/admin-notification-company-list.component';
import { AdminNotificationUserListComponent } from './admin-notification-user-list/admin-notification-user-list.component';
import { AdminOfferSkiListComponent } from './admin-offer-ski-list/admin-offer-ski-list.component';
import { AdminProducerListComponent } from './admin-producer-list/admin-producer-list.component';
import { AdminSkiListComponent } from './admin-ski-list/admin-ski-list.component';
import { AdminTransactionListComponent } from './admin-transaction-list/admin-transaction-list.component';
import { SupportComponent } from './support/support.component';
import { SupportNotificationCompanyComponent } from './support-notification-company/support-notification-company.component';
import { SupportNotificationUserComponent } from './support-notification-user/support-notification-user.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddProducerComponent } from './company-add-producer/company-add-producer.component';
import { CompanyAddSkiComponent } from './company-add-ski/company-add-ski.component';
import { CompanyAddOfferSkiComponent } from './company-add-offer-ski/company-add-offer-ski.component';
import {UserGuard} from './guard/user.guard';
import {AdminGuard} from './guard/admin.guard';
import {CompanyGuard} from './guard/company.guard';
import {SupportGuard} from './guard/support.guard';
import {MyAccountComponent} from './my-account/my-account.component';
import {MyOrderComponent} from './my-order/my-order.component';
import {CreateCompanyComponent} from './create-company/create-company.component';
import {MyTransactionComponent} from './my-transaction/my-transaction.component';

const routes: Routes = [
  { path: '', component: UnloginComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'form-login', component: FormLoginComponent },
      { path: 'form-regi', component: FormRegiComponent },
      { path: 'form-login-company', component: FormLoginCompanyComponent },
      { path: 'form-regi-company', component: FormRegiCompanyComponent },
      { path: 'search', component: SerchOfferSkiComponent },
      { path: 'profile-company/:id', component: ProfileCompanyComponent},
    ] },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard], children: [
      { path: '', component: MyAccountComponent },
      { path: 'search', component: SerchOfferSkiComponent },
      { path: 'my-order', component: MyOrderComponent },
      { path: 'create-company', component: CreateCompanyComponent },
      { path: 'my-transaction', component: MyTransactionComponent },
      { path: 'profile-company/:id', component: ProfileCompanyComponent},
    ]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: '', component: MyAccountComponent },
      { path: 'admin-user-list', component: AdminUserListComponent },
      { path: 'admin-company-list', component: AdminCompanyListComponent },
      { path: 'admin-unit-list', component: AdminUnitListComponent },
      { path: 'admin-price-list', component: AdminPriceListComponent },
      { path: 'admin-notification-company-list', component: AdminNotificationCompanyListComponent },
      { path: 'admin-notification-user-list', component: AdminNotificationUserListComponent },
      { path: 'admin-offer-ski-list', component: AdminOfferSkiListComponent },
      { path: 'admin-producer-list', component: AdminProducerListComponent },
      { path: 'admin-ski-list', component: AdminSkiListComponent },
      { path: 'admin-transaction-list', component: AdminTransactionListComponent },
    ]},
  { path: 'support', component: SupportComponent, canActivate: [SupportGuard], children: [
      { path: '', component: MyAccountComponent },
      { path: 'support-notification-company', component: SupportNotificationCompanyComponent },
      { path: 'support-notification-user', component: SupportNotificationUserComponent }
    ] },
  { path: 'company', component: CompanyComponent, canActivate: [CompanyGuard], children: [
      { path: '', component: MyAccountComponent },
      { path: 'company-producer', component: CompanyAddProducerComponent },
      { path: 'company-ski', component: CompanyAddSkiComponent },
      { path: 'company-offer-ski', component: CompanyAddOfferSkiComponent },
      { path: 'profile-company/:id', component: ProfileCompanyComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot([
  //   {
  //     path: 'admin',
  //     component: AdminComponent,
  //     canActivate: [AdminGuard]
  //   },
  //   {
  //     path: 'login',
  //     component: LoginComponent,
  //     canActivate: [UserGuard]
  //   },
  //   {
  //     path: 'company',
  //     component: CompanyComponent,
  //     canActivate: [CompanyGuard]
  //   },
  //   {
  //     path: 'support',
  //     component: SupportComponent,
  //     canActivate: [SupportGuard]
  //   },
  //   {
  //     path: '',
  //     component: UnloginComponent
  //   }
  // ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
