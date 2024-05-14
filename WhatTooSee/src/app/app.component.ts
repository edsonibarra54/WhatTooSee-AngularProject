import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/authService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WhatTooSee';

  hideHeaderOnLoginPage: boolean = false;
  hideonEditProduction: boolean = false;

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderOnLoginPage = this.router.url === '/login';
        this.hideonEditProduction = this.router.url === '/edit-productions'
      }
    });
  }

  redirectToEditProductions() {
    this.router.navigateByUrl('/edit-productions');
  }
}