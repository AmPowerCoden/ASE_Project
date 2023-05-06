import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FoodplansComponent } from './foodplans/foodplans.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { PlancreationComponent } from './plancreation/plancreation.component';
import { OrderComponent } from './orders/order.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "foodplans", component: FoodplansComponent },
  { path: "register", component: RegisterComponent},
  { path: "menu", component: MenuComponent},
  { path: "plancreation", component: PlancreationComponent},
  { path: "orders", component: OrderComponent},
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
