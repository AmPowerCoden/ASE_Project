import { Component, OnInit } from "@angular/core";
import { AppHttpClient } from "../shared/http-client.service";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";


@Component({
    selector: 'app-plancreation',
    templateUrl: './plancreation.component.html',
    styleUrls: ['./plancreation.component.scss']
  })
  export class PlancreationComponent implements OnInit {

    foodplanToCreate: { name: string, montag: string, montagPreis: number, dienstag: string, dienstagPreis: number, mittwoch: string, mittwochPreis: number, donnerstag: string, donnerstagPreis: number, freitag: string, freitagPreis: number, samstag: string, samstagPreis: number, startdate: string } = { name: "", montag: "", montagPreis: 0, dienstag: "", dienstagPreis: 0, mittwoch: "", mittwochPreis: 0, donnerstag: "", donnerstagPreis: 0, freitag: "", freitagPreis: 0, samstag: "", samstagPreis: 0, startdate: ""};
    errorMessage!: string;

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

      async ngOnInit(): Promise<void> {
      }

      async foodplanRegister(){
        alert(this.foodplanToCreate.startdate)
      }
  }