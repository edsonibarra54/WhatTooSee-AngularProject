import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Profile } from '../../interfaces/profile-information.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent {

  profileData: Profile | undefined;

  constructor(private http : HttpClient) { 
    this.fetchProfileData();
  }

  selectHeart(event: Event, ) {
    const clickedHeart = event.target as HTMLElement;

    // Cambiar la clase del corazón clicado
    if (clickedHeart.classList.contains('corazon-vacio')) {
        clickedHeart.classList.remove('corazon-vacio');
        clickedHeart.classList.add('corazon-lleno');
    } else {
        clickedHeart.classList.remove('corazon-lleno');
        clickedHeart.classList.add('corazon-vacio');
    }
  }

  fetchProfileData(): void {
    this.http.get<any>("http://localhost:8080/api/users/getUser").subscribe(
      (response) => {
        this.profileData = {
          email: response.result[0].email,
          username: response.result[0].username,
          password: response.result[0].password,
          photo: response.result[0].photo,
          description: response.result[0].description,
          followers: parseInt(response.result[0].followers),
          following: parseInt(response.result[0].follow),
          is_admin: parseInt(response.result[0].is_admin)
        };
      },
      (error) => {
        console.log('Error fetching profile data:', error);
      }
    );
  }
}
