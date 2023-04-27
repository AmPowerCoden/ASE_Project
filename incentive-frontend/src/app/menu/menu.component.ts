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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
    public bestellungen: bestellung = { montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag: "", personalnummer: Number(this.authService.getPersonalnummer()), montagGesamtpreis: 0, dienstagGesamtpreis: 0, mittwochGesamtpreis: 0, donnerstagGesamtpreis: 0, freitagGesamtpreis: 0, samstagGesamtpreis: 0};
    dataIsReady: boolean = false;
    public montagsBestellung: string = "";
    public dienstagBestellung: string = "";
    public mittwochBestellung: string = "";
    public donnerstagBestellung: string = "";
    public freitagBestellung: string = "";
    public samstagBestellung: string = "";
    bestellungToUpdate: { montag: string, dienstag: string, mittwoch: string, donnerstag: string, freitag: string, samstag: string, montagGesamtpreis: number, dienstagGesamtpreis: number, mittwochGesamtpreis: number, donnerstagGesamtpreis: number, freitagGesamtpreis: number, samstagGesamtpreis: number} = { montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag:"", montagGesamtpreis: 0, dienstagGesamtpreis: 0, mittwochGesamtpreis: 0, donnerstagGesamtpreis: 0, freitagGesamtpreis: 0, samstagGesamtpreis: 0 };
    bestellungToCreate: { personalnummer: number, montag: string, dienstag: string, mittwoch: string, donnerstag: string, freitag: string, samstag: string, montagGesamtpreis: number, dienstagGesamtpreis: number, mittwochGesamtpreis: number, donnerstagGesamtpreis: number, freitagGesamtpreis: number, samstagGesamtpreis: number} = { personalnummer: Number(this.authService.getPersonalnummer()), montag: "", dienstag: "", mittwoch: "", donnerstag: "", freitag: "", samstag:"", montagGesamtpreis: 0, dienstagGesamtpreis: 0, mittwochGesamtpreis: 0, donnerstagGesamtpreis: 0, freitagGesamtpreis: 0, samstagGesamtpreis: 0 };
    public montagTotal: number = 0;
    public dienstagTotal: number = 0;
    public mittwochTotal: number = 0;
    public donnerstagTotal: number = 0;
    public freitagTotal: number = 0;
    public samstagTotal: number = 0;
    public montagVegetarian = false;
    public dienstagVegetarian = false;
    public mittwochVegetarian = false;
    public donnerstagVegetarian = false;
    public freitagVegetarian = false;
    public samstagVegetarian = false;



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

        if(foodplan.name.includes("Menü 2")){
          if(this.bestellungen.montag.includes("(Vegetarian)"))
          {
            this.montagVegetarian = true;
          }
          if(this.bestellungen.dienstag.includes("(Vegetarian)"))
          {
            this.dienstagVegetarian = true;
          }
          if(this.bestellungen.mittwoch.includes("(Vegetarian)"))
          {
            this.mittwochVegetarian = true;
          }
          if(this.bestellungen.donnerstag.includes("(Vegetarian)"))
          {
            this.donnerstagVegetarian = true;
          }
          if(this.bestellungen.freitag.includes("(Vegetarian)"))
          {
            this.freitagVegetarian = true;
          }
          if(this.bestellungen.samstag.includes("(Vegetarian)"))
          {
            this.samstagVegetarian = true;
          }
        }

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
        this.foodplans = await firstValueFrom(this.http.get<foodplan[]>('/foodplans/date/' + await this.getPreviousMonday()));
        //this.foodplans = await firstValueFrom(this.http.get<foodplan[]>('/foodplans'));
        
      }
      catch (error: unknown) {
        this.errorMessage = (error as Error).message;
      }
    }

    async getPreviousMonday()
    {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if(date.getDay() == 0){
        prevMonday.setDate(date.getDate());
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }
    let datestring = prevMonday.toDateString();
    let splitted = datestring.split(" ");
    let finishedString = "";
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"]
    let counter = 1
    for(let element of months)
    {
      if(splitted[1] == element){
        if(element == "Oct" || element == "Nov" || element == "Dec"){
          finishedString = splitted[3] + "-" + counter.toString() + "-" + splitted[2];
        }
        else
        {
          finishedString = splitted[3] + "-0" + counter.toString() + "-" + splitted[2];
        }
      }
      counter++;   
    }
    return finishedString;
    } //Stackoverflow

    async getBestellungen(){
      try{
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
          let  vegetarien = "";
          if(this.foodplans[counter].montagCheck){
            if(foodplan.name.includes("Menü 2") && this.montagVegetarian){
              vegetarien = "(Vegetarian)"
              alert(vegetarien)
            }
            this.montagsBestellung = this.montagsBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          if(this.foodplans[counter].dienstagCheck){
            if(foodplan.name.includes("Menü 2") && this.dienstagVegetarian){
              vegetarien = "(Vegetarian)"
            }
            this.dienstagBestellung = this.dienstagBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          if(this.foodplans[counter].mitwochCheck){
            if(foodplan.name.includes("Menü 2") && this.mittwochVegetarian){
              vegetarien = "(Vegetarian)"
            }
            this.mittwochBestellung = this.mittwochBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          if(this.foodplans[counter].donnerstagCheck){
            if(foodplan.name.includes("Menü 2") && this.donnerstagVegetarian){
              vegetarien = "(Vegetarian)"
            }
            this.donnerstagBestellung = this.donnerstagBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          if(this.foodplans[counter].freitagsCheck){
            if(foodplan.name.includes("Menü 2") && this.freitagVegetarian){
              vegetarien = "(Vegetarian)"
            }
            this.freitagBestellung = this.freitagBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          if(this.foodplans[counter].samstagsCheck){
            if(foodplan.name.includes("Menü 2") && this.samstagVegetarian){
              vegetarien = "(Vegetarian)"
            }
            this.samstagBestellung = this.samstagBestellung + foodplan.name + vegetarien
            vegetarien = "";
          }
          counter++;
        }
        this.bestellungToUpdate.montag = this.montagsBestellung;
        this.bestellungToUpdate.dienstag = this.dienstagBestellung;
        this.bestellungToUpdate.mittwoch = this.mittwochBestellung;
        this.bestellungToUpdate.donnerstag = this.donnerstagBestellung;
        this.bestellungToUpdate.freitag = this.freitagBestellung;
        this.bestellungToUpdate.samstag = this.samstagBestellung;
        this.bestellungToUpdate.montagGesamtpreis = this.montagTotal;
        this.bestellungToUpdate.dienstagGesamtpreis = this.dienstagTotal;
        this.bestellungToUpdate.mittwochGesamtpreis = this.mittwochTotal;
        this.bestellungToUpdate.donnerstagGesamtpreis = this.donnerstagTotal;
        this.bestellungToUpdate.freitagGesamtpreis = this.freitagTotal;
        this.bestellungToUpdate.samstagGesamtpreis = this.samstagTotal;
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
          this.bestellungToCreate.montagGesamtpreis = this.montagTotal;
          this.bestellungToCreate.dienstagGesamtpreis = this.dienstagTotal;
          this.bestellungToCreate.mittwochGesamtpreis = this.mittwochTotal;
          this.bestellungToCreate.donnerstagGesamtpreis = this.donnerstagTotal;
          this.bestellungToCreate.freitagGesamtpreis = this.freitagTotal;
          this.bestellungToCreate.samstagGesamtpreis = this.samstagTotal;

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

    async createPDF() {
      let DATA: any = document.getElementById('pdfPrint');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 1080;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', [1920, 1080]);
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('essensbestellung:' + this.getPreviousMonday() + '.pdf');
    });

    }
    
  }


  