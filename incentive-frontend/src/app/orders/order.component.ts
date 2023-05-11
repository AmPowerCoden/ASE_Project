import { Component, OnInit } from "@angular/core";
import { AppHttpClient } from "../shared/http-client.service";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { bestellung } from "../shared/bestellung";
import { firstValueFrom } from "rxjs";


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
  })
  export class OrderComponent implements OnInit {

    public bestellungen!: bestellung[];
    public errorMsg!: string;
    public menuNames: string[] = [];
    public Zusammenfassung: {name: string, countMontag: number, countDienstag: number, countMittwoch: number, countDonnerstag: number, countFreitag: number, countSamstag: number}[] = [];
    public adminState!: boolean;

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

      async ngOnInit(): Promise<void> {
        this.adminState = await this.isAdmin();
        await this.getBestellungen();
        await this.getMenuNames();
        await this.getZusammenfassung();
      }

      async getBestellungen(){
        try{
          this.bestellungen = await firstValueFrom(this.http.get<bestellung[]>('/bestellungen'))
        }
        catch (error: unknown) {
            this.errorMsg = (error as Error).message
        }
      }

    getMenuNames(){
        try{
            for(let element of this.bestellungen){

                let menues = element.montag.split(";");
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }

                menues = element.dienstag.split(";")
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }

                menues = element.mittwoch.split(";")
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }

                menues = element.donnerstag.split(";")
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }

                menues = element.freitag.split(";")
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }

                menues = element.samstag.split(";")
                for(let el of menues)
                {
                    if(!(this.menuNames.some(x => x === el))){
                        this.menuNames.push(el)
                    }
                }
            }
        }
        
        catch (error: unknown) {
            this.errorMsg = (error as Error).message
        }

        this.menuNames.forEach((item, index) => {
            if(item === "" ) this.menuNames.splice(index, 1)
        });

      }

    async getZusammenfassung(){
        try{

            for(let element of this.menuNames)
            {
                let montagsCounter = 0;
                let dienstagsCounter = 0;
                let mittwochsCounter = 0;
                let donnerstagsCounter = 0;
                let freitagsCounter = 0;
                let samstagsCounter = 0;
                    for(let bestellungselement of this.bestellungen){
                        let orders = bestellungselement.montag.split(";");
                        if(bestellungselement.montag.split(";").includes(element)){
                            montagsCounter++;
                        }
                        
                    
                        if(bestellungselement.dienstag.split(";").includes(element)){
                            dienstagsCounter++;
                        }

                        if(bestellungselement.mittwoch.split(";").includes(element)){
                            mittwochsCounter++;
                        }

                        if(bestellungselement.donnerstag.split(";").includes(element)){
                            donnerstagsCounter++;
                        }

                        if(bestellungselement.freitag.split(";").includes(element)){
                            freitagsCounter++;
                        }

                        if(bestellungselement.samstag.split(";").includes(element)){
                            samstagsCounter++;
                        }
                }
                this.Zusammenfassung.push({name: element, countMontag: montagsCounter, countDienstag: dienstagsCounter, countMittwoch: mittwochsCounter, countDonnerstag: donnerstagsCounter, countFreitag: freitagsCounter, countSamstag: samstagsCounter})
                
            }
        }
        catch (error: unknown) {
            this.errorMsg = (error as Error).message
        }
        
        
        
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