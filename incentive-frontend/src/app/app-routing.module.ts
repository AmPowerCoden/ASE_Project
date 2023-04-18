import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "register", component: RegisterComponent},
  { path: "menu", component: MenuComponent},
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
