import { Component } from '@angular/core';
import { ProfileCommentariesComponent } from '../../components/profile-commentaries/profile-commentaries.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileCommentariesComponent, ProfileInformationComponent, RouterOutlet, RouterLink],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})
export class ProfilePage {
  constructor(private router: Router, private http : HttpClient) { }

  redirectToEditProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
  
  redirectToEditProductions() {
    this.router.navigateByUrl('/edit-productions');
  }

  public fetchProfileInformation(){
    this.http.get("http://localhost:8080/api/profile/getProfile").subscribe({
      next: (response : any) => {
        console.log(response);
      },
      error: (error : any) => {
        console.log(error);
      }
    });
  }
}
