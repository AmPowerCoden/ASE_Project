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

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

      async ngOnInit(): Promise<void> {
      }
  }