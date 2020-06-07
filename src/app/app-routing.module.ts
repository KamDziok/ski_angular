import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { SupportComponent } from './support/support.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: '', component: UnloginComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'form-login', component: FormLoginComponent },
      { path: 'form-regi', component: FormRegiComponent },
      { path: 'form-login-company', component: FormLoginCompanyComponent },
      { path: 'form-regi-company', component: FormRegiCompanyComponent },
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children:[
      { path: 'admin-user-list', component: AdminUserListComponent },
      { path: 'admin-company-list', component: AdminCompanyListComponent },
      { path: 'admin-unit-list', component: AdminUnitListComponent },
      { path: 'admin-price-list', component: AdminPriceListComponent },
    ]},
  { path: 'support', component: SupportComponent },
  { path: 'company', component: CompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
