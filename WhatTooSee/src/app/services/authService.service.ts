import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private token = "auth_token";
    private idUserKey = "user_id";
    private isAdminKey = "is_admin";

    constructor() {}

    setData(token:string, id: string, admin: string) {
        localStorage.setItem(this.token, token);
        localStorage.setItem(this.idUserKey, id);
        localStorage.setItem(this.isAdminKey, admin);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem("auth_token");
        return !!token;
    }

    cleanData(): void {
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.idUserKey);
        localStorage.removeItem(this.isAdminKey);
    }

    getIdUser(): string | null {
        return localStorage.getItem(this.idUserKey);
    }

    isAdmin(): boolean {
        const isAdminStr = localStorage.getItem(this.isAdminKey);
        return isAdminStr ? isAdminStr === "1" : false;
    }
}