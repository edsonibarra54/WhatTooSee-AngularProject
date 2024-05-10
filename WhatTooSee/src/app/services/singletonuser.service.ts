import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile-information.interface';

@Injectable({
  providedIn: 'root',
})

export class loggedUser {
  private loggedUser: Profile;
  private isLogged: boolean;

  constructor() {
    this.isLogged = false;
    this.loggedUser = {
        _id: "",
        email: "",
        username: "",
        password: "",
        photo: "",
        description: "",
        follow: -1,
        followers: -1,
        is_admin: -1,
        following: []
      };
  }

  setData(data: Profile) {
    this.loggedUser = data;
    this.isLogged = true;
  }

  getData() {
    return this.loggedUser;
  }

  getIsLogged(){
    return this.isLogged;
  }

  isAdmin(): boolean {
    if(this.loggedUser.is_admin < 1) 
      return false;
    else 
      return true;
  }
  cleanUser(): void{
    this.isLogged = false;
    this.loggedUser = {
        _id: "",
        email: "",
        username: "",
        password: "",
        photo: "",
        description: "",
        follow: -1,
        followers: -1,
        is_admin: -1,
        following: []
      };
  }

}