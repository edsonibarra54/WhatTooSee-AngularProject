import { HttpClient } from '@angular/common/http';
import { Component , Input , OnInit} from '@angular/core';
import { Profile } from '../../interfaces/profile-information.interface';
import { CommonModule } from '@angular/common';
import { Router , NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/authService.service';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})

export class ProfileInformationComponent implements OnInit{

  @Input() user?: Profile;

  isFollowing: boolean = false;

  tmpUser: Profile = {
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

  constructor(private router: Router, private http : HttpClient, public authService: AuthService) { 
  }
  
  ngOnInit(): void {
    this.fetchProfileData();
  }
  

  toggleFollow(): void {
    let tmpArray:string[];
    if (!this.user || !this.authService.isAuthenticated()) {
      return;
    }
    const userId = this.authService.getIdUser();
    if (this.isFollowing) {
      tmpArray = this.tmpUser.following.filter(cadena => cadena !== this.user!._id);
      console.log(tmpArray);
      if (userId !== null) {this.updateFollowing(tmpArray, userId);} else return;
      this.updateFollowers(-1, this.user!._id);
      this.user!.followers = this.user!.followers-1;
    } else {
      tmpArray = this.tmpUser.following;
      tmpArray.push(this.user._id);
      if (userId !== null) {this.updateFollowing(tmpArray, userId);} else return;
      this.updateFollowers(1, this.user!._id);
      this.user!.followers = this.user!.followers+1;
    }
    this.isFollowing = !this.isFollowing;
  }

  isFollowingUser(): boolean {
    if (this.tmpUser && this.user) {
        console.log(this.tmpUser.following.includes(this.user._id));
        console.log(this.tmpUser);
        console.log(this.user._id);
        return this.tmpUser.following.includes(this.user._id);
    }
    return false;
  }

  fetchProfileData(): void {
    const url = "http://localhost:8080/api/users/getUserId?id=" + this.authService.getIdUser();
    this.http.get(url).subscribe(
      {
        next: (response: any) =>{
          this.tmpUser = response.result;
          this.isFollowing = this.isFollowingUser();
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  updateFollowing(following: string[],  id: string){
    const url = "http://localhost:8080/api/users/updateFollowing/" + id;
    this.http.put(url, { following: following, id: id}).subscribe({
      next: (response: any) => {
        console.log('following actualizado con éxito', response);
      },
      error: (error: any) => {
        console.error('Error al actualizar el usuario', error);
      }
    });
  }

  updateFollowers(increment:Number,  id: string){
    const url = "http://localhost:8080/api/users/updateFollowersCount/" + id + "/" + increment;
    this.http.put(url, {}).subscribe({
      next: (response: any) => {
        console.log('followers actualizado con éxito', response);
      },
      error: (error: any) => {
        console.error('Error al actualizar el usuario', error);
      }
    });
  }
}
