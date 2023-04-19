import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {
    userToLogin: { email: string, password: string } = { email: "", password: "" };
    userToRegister: { email: string, personalnummer: number, password: string } = { email: "", personalnummer: 0,  password: "" };
    errorMessage: string = "";
    
    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
    ) {}
  
    async ngOnInit(): Promise<void> {
      if (this.authService.hasAccessToken()) {
        await this.router.navigate(["/profile"]);
      }
    }
  
    async register() { 
      try {
        const resultRegister = await firstValueFrom(this.http.post<{ access_token: string, userId: string, personalnummer: number }>("/users", this.userToRegister));
        //this.userToLogin.email = this.userToRegister.email
        //this.userToLogin.password = this.userToRegister.password
        //const result = await firstValueFrom(this.http.post<{ access_token: string, userId: string }>("/auth/login", this.userToLogin));
        this.authService.setAccessToken(resultRegister.access_token, resultRegister.userId, resultRegister.personalnummer);
        await this.router.navigate(["/profile"]);
      } catch (error: unknown) {
        this.errorMessage = (error as Error).message;
      }
    }
  }
  