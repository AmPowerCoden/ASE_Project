import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';
import { DateTime } from 'luxon';
import { foodplan } from '../menu/foodplan';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { SharedModule } from '../shared/shared.module';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
  })
  export class MenuComponent implements OnInit {
    
    dateToGet: { date : DateTime} = { date: DateTime.fromObject({
      year: 2023,
      month: 4,
      day: 17
    })}
    errorMessage: string = "";
    public foodplans!: foodplan[];
    dataIsReady: boolean = false;
    test: string[] =["haloo", "hey"];

    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
    ) {}

     async ngOnInit(): Promise<void> {
      await this.getFoodplans();
      this.errorMessage = this.foodplans[0].name;
      //alert(this.foodplans[0].name);
      this.test.push("a")
      this.test.push("b")
      this.test.push("c")
      //alert(this.test[1])
    }



    /*  getFoodplansToDate(): Observable<any[]> {
      try{
        return this.http.post<any[]>('/foodplans/date', this.);
      }
    }*/
  

    async getFoodplans(){
      try{
        const date = DateTime.fromObject({
          year: 2023,
          month: 4,
          day: 17
        })
        //this.foodplans = await firstValueFrom(this.http.get<foodplan[]>('/foodplans/' + this.dateToGet));
        this.foodplans = await firstValueFrom(this.http.get<foodplan[]>('/foodplans'));
        this.dataIsReady = true;
      }
      catch (error: unknown) {
        this.errorMessage = (error as Error).message;
      }
    }
    
  }


  