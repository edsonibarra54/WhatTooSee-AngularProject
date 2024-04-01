import { Component } from '@angular/core';
import { ProfileCommentariesComponent } from '../../components/profile-commentaries/profile-commentaries.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileCommentariesComponent, ProfileInformationComponent, RouterOutlet, RouterLink],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})
export class ProfilePage {
  constructor(private router: Router) { }

  redirectToEditProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
  
  redirectToEditProductions() {
    this.router.navigateByUrl('/edit-productions');
  }
}
