import { Component, OnInit } from "@angular/core";
import { AppHttpClient } from "../shared/http-client.service";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { bestellung } from "../menu/bestellung";
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
    

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

      async ngOnInit(): Promise<void> {
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
                if(!(this.menuNames.some(x => x === element.montag.split(";")[0]))){
                    this.menuNames.push(element.montag.split(";")[0])
                }
                if(!(this.menuNames.some(x => x === element.dienstag.split(";")[0]))){
                    this.menuNames.push(element.dienstag.split(";")[0])
                }
                if(!(this.menuNames.some(x => x === element.mittwoch.split(";")[0]))){
                    this.menuNames.push(element.mittwoch.split(";")[0])
                }
                if(!(this.menuNames.some(x => x === element.donnerstag.split(";")[0]))){
                    this.menuNames.push(element.donnerstag.split(";")[0])
                }
                if(!(this.menuNames.some(x => x === element.freitag.split(";")[0]))){
                    this.menuNames.push(element.freitag.split(";")[0])
                }
                if(!(this.menuNames.some(x => x === element.samstag.split(";")[0]))){
                    this.menuNames.push(element.samstag.split(";")[0])
                }
            }
        }
        
        catch (error: unknown) {
            this.errorMsg = (error as Error).message
        }
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
                    if(bestellungselement.montag){
                        montagsCounter++;
                    }
                    if(bestellungselement.dienstag){
                        dienstagsCounter++;
                    }
                    if(bestellungselement.mittwoch){
                        mittwochsCounter++;
                    }
                    if(bestellungselement.donnerstag){
                        donnerstagsCounter++;
                    }
                    if(bestellungselement.freitag){
                        freitagsCounter++;
                    }
                    if(bestellungselement.samstag){
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
  }