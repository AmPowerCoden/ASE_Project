import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
  })
  export class MenuComponent implements OnInit {
  
    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
    ) {}

    async ngOnInit(): Promise<void> {
      //try{
        //return this.http.post<any[]>('/foodplans/date');
      //}
    }

    /*getFoodplansToDate(): Observable<any[]> {
      try{
        return this.http.post<any[]>('/foodplans/date', this.);
      }
    }*/
  
    
  }
  