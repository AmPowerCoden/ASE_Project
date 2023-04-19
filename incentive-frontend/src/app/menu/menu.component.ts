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
import { bestellung } from './bestellung';


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
    public bestellungen: bestellung = { montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag: "", personalnummer: Number(this.authService.getPersonalnummer())};
    dataIsReady: boolean = false;
    public montagsBestellung: string = "";
    public dienstagBestellung: string = "";
    public mittwochBestellung: string = "";
    public donnerstagBestellung: string = "";
    public freitagBestellung: string = "";
    public samstagBestellung: string = "";
    bestellungToUpdate: { montag: string, dienstag: string, mittwoch: string, donnerstag: string, freitag: string, samstag: string} = { montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag:"" };
    bestellungToCreate: { personalnummer: number, montag: string, dienstag: string, mittwoch: string, donnerstag: string, freitag: string, samstag: string} = { personalnummer: Number(this.authService.getPersonalnummer()), montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag:"" };
    public montagTotal: number = 0;
    public dienstagTotal: number = 0;
    public mittwochTotal: number = 0;
    public donnerstagTotal: number = 0;
    public freitagTotal: number = 0;
    public samstagTotal: number = 0;


    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
    ) {}

     async ngOnInit(): Promise<void> {
      await this.getFoodplans();
      await this.getBestellungen();
      let counter = 0;
      for (let foodplan of this.foodplans){

        if(this.bestellungen.montag.includes(foodplan.name)){
          this.foodplans[counter].montagCheck = true
        } else {
          this.foodplans[counter].montagCheck = false
        }
        if(this.bestellungen.dienstag.includes(foodplan.name)){
          this.foodplans[counter].dienstagCheck = true
        } else {
          this.foodplans[counter].dienstagCheck = false
        }
        if(this.bestellungen.mittwoch.includes(foodplan.name)){
          this.foodplans[counter].mitwochCheck = true
        } else {
          this.foodplans[counter].mitwochCheck = false
        }
        if(this.bestellungen.donnerstag.includes(foodplan.name)){
          this.foodplans[counter].donnerstagCheck = true
        } else {
          this.foodplans[counter].donnerstagCheck = false
        }
        if(this.bestellungen.freitag.includes(foodplan.name)){
          this.foodplans[counter].freitagsCheck = true
        } else {
          this.foodplans[counter].freitagsCheck = false
        }
        if(this.bestellungen.samstag.includes(foodplan.name)){
          this.foodplans[counter].samstagsCheck = true
        } else {
          this.foodplans[counter].samstagsCheck = false
        }
        counter++;
      }
      
      await this.onCheckboxChange()
      this.dataIsReady = true;
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
        
      }
      catch (error: unknown) {
        this.errorMessage = (error as Error).message;
      }
    }

    async getBestellungen(){
      try{
        const date = DateTime.fromObject({
          year: 2023,
          month: 4,
          day: 17
        })
        this.bestellungen = await firstValueFrom(this.http.get<bestellung>('/bestellungen/' + this.authService.getPersonalnummer()))
      }
      catch (error: unknown) {
        
      }
    }

    async bestellungAbsenden(){
      this.bestellungToUpdate.montag = "";
      this.bestellungToUpdate.dienstag = "";
      this.bestellungToUpdate.mittwoch = "";
      this.bestellungToUpdate.donnerstag = "";
      this.bestellungToUpdate.freitag = "";
      this.bestellungToUpdate.samstag = "";
      try{
        let counter = 0;
        for (let foodplan of this.foodplans){

          if(this.foodplans[counter].montagCheck){
            this.montagsBestellung = this.montagsBestellung + foodplan.name
          }
          if(this.foodplans[counter].dienstagCheck){
            this.dienstagBestellung = this.dienstagBestellung + foodplan.name
          }
          if(this.foodplans[counter].mitwochCheck){
            this.mittwochBestellung = this.mittwochBestellung + foodplan.name
          }
          if(this.foodplans[counter].donnerstagCheck){
            this.donnerstagBestellung = this.donnerstagBestellung + foodplan.name
          }
          if(this.foodplans[counter].freitagsCheck){
            this.freitagBestellung = this.freitagBestellung + foodplan.name
          }
          if(this.foodplans[counter].samstagsCheck){
            this.samstagBestellung = this.samstagBestellung + foodplan.name
          }
          counter++;
        }
        this.bestellungToUpdate.montag = this.montagsBestellung;
        this.bestellungToUpdate.dienstag = this.dienstagBestellung;
        this.bestellungToUpdate.mittwoch = this.mittwochBestellung;
        this.bestellungToUpdate.donnerstag = this.donnerstagBestellung;
        this.bestellungToUpdate.freitag = this.freitagBestellung;
        this.bestellungToUpdate.samstag = this.samstagBestellung;
        const result = await firstValueFrom(this.http.patch<bestellung>('/bestellungen/' + Number(this.authService.getPersonalnummer()), this.bestellungToUpdate))
        alert("Ihre Bestellung für nächste Woche wurde Aktualisiert")
      }
      catch (error: unknown) {
        try{
          
          this.bestellungToCreate.montag = this.montagsBestellung;
          this.bestellungToCreate.dienstag = this.dienstagBestellung;
          this.bestellungToCreate.mittwoch = this.mittwochBestellung;
          this.bestellungToCreate.donnerstag = this.donnerstagBestellung;
          this.bestellungToCreate.freitag = this.freitagBestellung;
          this.bestellungToCreate.samstag = this.samstagBestellung;

          const result = await firstValueFrom(this.http.post<bestellung>("/bestellungen", this.bestellungToCreate))
          alert("Ihre Bestellung wurde in der Datenbank angelegt!")
        }
        catch (error: unknown) {
          this.errorMessage = (error as Error).message
        }
        
      }
    }

    trackByIndex(index: number, obj: any): any {
      return index;
    }

    async onCheckboxChange() {
      let counter = 0;
      this.montagTotal = 0;
      this.dienstagTotal = 0;
      this.mittwochTotal = 0;
      this.donnerstagTotal = 0;
      this.freitagTotal = 0;
      this.samstagTotal = 0;

      for (let foodplan in this.foodplans){
        if(this.foodplans[counter].montagCheck){
          this.montagTotal = this.montagTotal + this.foodplans[counter].montagPreis
        }
        if(this.foodplans[counter].dienstagCheck){
          this.dienstagTotal = this.dienstagTotal + this.foodplans[counter].dienstagPreis
        }
        if(this.foodplans[counter].mitwochCheck){
          this.mittwochTotal = this.mittwochTotal + this.foodplans[counter].mittwochPreis
        }
        if(this.foodplans[counter].donnerstagCheck){
          this.donnerstagTotal = this.donnerstagTotal + this.foodplans[counter].donnerstagPreis
        }
        if(this.foodplans[counter].freitagsCheck){
          this.freitagTotal = this.freitagTotal + this.foodplans[counter].freitagPreis
        }
        if(this.foodplans[counter].samstagsCheck){
          this.samstagTotal = this.samstagTotal + this.foodplans[counter].samstagPreis
        }
        counter++;
      }
    }
    
  }


  