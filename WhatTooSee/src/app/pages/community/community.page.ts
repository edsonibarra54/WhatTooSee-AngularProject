import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { Profile } from '../../interfaces/profile-information.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './community.page.html',
  styleUrl: './community.page.css'
})
export class CommunityPage {
  profiles: Profile[] = [];

  constructor(private http: HttpClient) {
    this.fetchProfileData();
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
