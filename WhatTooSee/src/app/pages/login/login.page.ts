import { Component, OnInit, OnDestroy, Renderer2 , NgModule, input, Input } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loggedUser } from '../../services/singletonuser.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.page.css'],
  animations: [
    trigger('action_up', [
      state('login', style({ transform: 'translateX(0)' ,opacity: '0',zIndex: '1'})),
      state('signup', style({ transform: 'translateX(100%)',opacity: '1',zIndex: '5'})),
      transition('login => signup', animate('600ms ease-in-out')),
      transition('signup => login', animate('600ms ease-in-out'))
    ]),
    trigger('action_in', [
      state('login', style({ transform: 'translateX(0)',opacity: '1',zIndex: '5' })),
      state('signup', style({ transform: 'translateX(100%)',opacity: '0',zIndex: '1' })),
      transition('login => signup', animate('600ms ease-in-out')),
      transition('signup => login', animate('600ms ease-in-out'))
    ]),
    trigger('toggle_c', [
      state('login', style({ transform: 'translateX(0)', borderRadius: '150px 0 0 100px' })),
      state('signup', style({ transform: 'translateX(-100%)', borderRadius: '0 150px 100px 0'})),
      transition('login => signup', animate('600ms ease-in-out')),
      transition('signup => login', animate('600ms ease-in-out'))
    ]),
    trigger('toggle', [
      state('login', style({ transform: 'translateX(0)'})),
      state('signup', style({ transform: 'translateX(50%)'})),
      transition('login => signup', animate('600ms linear')),
      transition('signup => login', animate('600ms linear'))
    ]),
    trigger('toggle_r', [
      state('login', style({ transform: 'translateX(100%)'})),
      state('signup', style({ transform: 'translateX(100%)'})),
      transition('login => signup', animate('0ms linear')),
      transition('signup => login', animate('0ms linear'))
    ]),
    trigger('toggle_l', [
      state('signup', style({ transform: 'translateX(0)'})),
      state(' login', style({ transform: 'translateX(100%)'})),
      transition('login => signup', animate('0ms linear')),
      transition('signup => login', animate('0ms linear'))
    ]),
  ]
})

export class LoginPage implements OnInit, OnDestroy {
  email: string = "";
  password: string = "";
  userAction: string = "login";

  constructor(private renderer: Renderer2, private router: Router, private http : HttpClient, private loggeduser: loggedUser) {}

  signIn(): void {
    console.log("Click");
    this.fetchAuthUser(this.email, this.password);
  }
  
  toggleAnimation(): void {
    this.userAction = this.userAction === "login" ? "signup" : "login";
  }

  ngOnInit(): void {

    const logoDiv = this.renderer.createElement('div');
    this.renderer.setAttribute(logoDiv, 'id', 'login-logo');
    this.renderer.appendChild(document.body, logoDiv);
    logoDiv.addEventListener('click', this.navigateToAnotherRoute.bind(this));

    this.renderer.addClass(document.body, 'login-page');

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/login') {
          this.renderer.addClass(document.body, 'login-page');
        } else {
          this.renderer.removeClass(document.body, 'login-page');
        }
      });
    
  }

  ngOnDestroy(): void {

    const logoDiv = document.getElementById('login-logo');
    if (logoDiv) {
      logoDiv.remove();
    }
  }

  navigateToAnotherRoute(): void {
    this.router.navigate(['/home']);
  }

  fetchAuthUser(email: string, password: string): void {
    const url = "http://localhost:8080/api/users/auth?email=" + email + "&password=" + password;
    console.log(url);
      this.http.get(url).subscribe(
        {
          next: (response: any) =>{
            if(response.result) {
              console.log("ola");
              this.loggeduser.setData(response.result);
              this.navigateToAnotherRoute();
            } else {
              alert("Credenciales incorrectas");
            }
          },
          error: (error: any) => {
            alert("Credenciales incorrectas");
            console.log(error);
          }
        }
      );
  }

  
}