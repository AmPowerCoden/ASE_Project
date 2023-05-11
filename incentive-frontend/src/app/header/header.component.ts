import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  adminState!: boolean;

  constructor(private router: Router, private readonly authService: AuthService) { }
  

  async ngOnInit(): Promise<void> {
    this.adminState = await this.isAdmin();
  }

  async logout() {
    this.authService.reset();
    await this.router.navigate(["/login"]);
  }

  async isAdmin(){
    if (this.authService.getRoles()?.includes("administrator")){
      return true;
    }
    else{
      return false;
    }
  }
}
