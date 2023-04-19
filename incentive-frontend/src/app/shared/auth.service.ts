import { Injectable } from "@angular/core";

// We use the browser's localStorage API to save the access token for all sessions in this browser
const AUTH_TOKEN = "app-access-token";
const USER_ID = "app-user-id";
const PERSONALNUMMER = "app-personalnummer"

@Injectable()
export class AuthService {
    private accessToken = localStorage.getItem(AUTH_TOKEN) || "";
    private userId = localStorage.getItem(USER_ID) || "";
    private personalnummer = localStorage.getItem(PERSONALNUMMER) || 0;

    setAccessToken(token: string, userId: string, personalnummer: number) {
        this.accessToken = token;
        this.userId = userId;
        this.personalnummer = personalnummer;
        localStorage.setItem(AUTH_TOKEN, this.accessToken);
        localStorage.setItem(USER_ID, this.userId);
        localStorage.setItem(PERSONALNUMMER, this.personalnummer.toString());
    }

    hasAccessToken() {
        return !!this.accessToken;
    }

    reset() {
        this.setAccessToken("", "", 0);
    }

    getAuthHeader(): { Authorization: string } | {} {
        if (!this.accessToken) {
            return {};
        }
        return { Authorization: `Bearer ${this.accessToken}` };
    }

    getUserId() {
        return this.userId;
    }

    getPersonalnummer() {
        return this.personalnummer.toString();
    }
}