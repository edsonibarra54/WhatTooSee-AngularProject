import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../interfaces/profile-information.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})

export class UserCardComponent {
  @Input() profile: Profile | undefined;
  profiles: Profile[] = [];

  constructor(private router: Router, private http : HttpClient) { 
    this.fetchProfileData();
  }

  redirectToProfile() {
    this.router.navigateByUrl('/profile');
  }

  fetchProfileData(): void {
    this.http.get<any>("http://localhost:8080/api/users/getUser").subscribe(
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.profiles = response.result.map((user: any) => ({
            email: user.email,
            username: user.username,
            password: user.password,
            photo: user.photo,
            description: user.description,
            followers: parseInt(user.followers),
            following: parseInt(user.follow),
            is_admin: parseInt(user.is_admin)
          }));
        } else {
          this.profiles = [];
        }
      },
      (error) => {
        console.log('Error fetching profile data:', error);
      }
    );
  }
}
