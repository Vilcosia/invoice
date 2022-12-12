import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'invoice' , component: InvoiceComponent},
  {path:'client',component:ClientComponent},
  {path:'profile',component:ProfileComponent},
  {path:'createInvoice',component:CreateInvoiceComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
