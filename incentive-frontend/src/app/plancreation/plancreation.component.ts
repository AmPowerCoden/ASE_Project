import { Component, OnInit } from "@angular/core";
import { AppHttpClient } from "../shared/http-client.service";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { firstValueFrom } from "rxjs";
import { foodplan } from "../shared/foodplan";


@Component({
    selector: 'app-plancreation',
    templateUrl: './plancreation.component.html',
    styleUrls: ['./plancreation.component.scss']
  })
  export class PlancreationComponent implements OnInit {

    foodplanToCreate: { name: string, montagProdukt: string, montagPreis: number, dienstagProdukt: string, dienstagPreis: number, mittwochProdukt: string, mittwochPreis: number, donnerstagProdukt: string, donnerstagPreis: number, freitagProdukt: string, freitagPreis: number, samstagProdukt: string, samstagPreis: number, start: string } = { name: "", montagProdukt: "", montagPreis: 0, dienstagProdukt: "", dienstagPreis: 0, mittwochProdukt: "", mittwochPreis: 0, donnerstagProdukt: "", donnerstagPreis: 0, freitagProdukt: "", freitagPreis: 0, samstagProdukt: "", samstagPreis: 0, start: ""};
    errorMessage!: string;
    adminState!: boolean;

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

      async ngOnInit(): Promise<void> {
        this.adminState = await this.isAdmin()
      }

      async foodplanRegister(){

        let modayDate = new Date(this.foodplanToCreate.start);

        var day = modayDate.getDay();
        var prevMonday = new Date();
        if(modayDate.getDay() == 0){
          prevMonday.setDate(modayDate.getDate());
        }
        else{
          prevMonday.setDate(modayDate.getDate() - (day-1));
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

        this.foodplanToCreate.start = finishedString;

        try{
          const result = await firstValueFrom(this.http.post<foodplan>("/foodplans", this.foodplanToCreate))
          this.foodplanToCreate = { name: "", montagProdukt: "", montagPreis: 0, dienstagProdukt: "", dienstagPreis: 0, mittwochProdukt: "", mittwochPreis: 0, donnerstagProdukt: "", donnerstagPreis: 0, freitagProdukt: "", freitagPreis: 0, samstagProdukt: "", samstagPreis: 0, start: ""};
          alert(this.foodplanToCreate.name + " wurde als foodplameingetragen!")
        }
        catch(error: unknown){
          this.errorMessage = (error as Error).message
        }
        
      }

      async isAdmin(){
        alert(this.authService.getRoles())
        if (this.authService.getRoles()?.includes("administrator")){
          return true;
        }
        else{
          return false;
        }
      }
  }