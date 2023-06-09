import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FoodplansComponent } from './foodplans/foodplans.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpClient } from './shared/http-client.service';
import { AuthService } from './shared/auth.service';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { PlancreationComponent } from './plancreation/plancreation.component';
import { OrderComponent } from './orders/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    FoodplansComponent,
    MenuComponent,
    PlancreationComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AppHttpClient, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private http: AppHttpClient) {
    this.http.setBaseUrl("http://localhost:4500/api");
  }
}
