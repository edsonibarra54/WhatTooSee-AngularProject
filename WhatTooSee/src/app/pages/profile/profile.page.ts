import { Component , OnInit} from '@angular/core';
import { ProfileCommentariesComponent } from '../../components/profile-commentaries/profile-commentaries.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../interfaces/profile-information.interface';
import { Location , CommonModule} from '@angular/common';
import { CommentsUser } from '../../interfaces/comments-user.interface';
import { loggedUser } from '../../services/singletonuser.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileCommentariesComponent, ProfileInformationComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css'
})

export class ProfilePage {
  comments: CommentsUser[] = [];
  profile!: Profile;
  userId: string;
  mySelf: boolean = false;

  constructor(private router: Router, private http : HttpClient, private location: Location, public userlog: loggedUser) { 
     const url = this.location.path();
     const segments = url.split('/');
     this.userId = segments[segments.length - 1];
     this.getMySelf();
     this.fetchProfileData(this.userId);
     this.fetchProfileCommentsData(this.userId);
  }

  redirectToEditProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
  
  redirectToEditProductions() {
    this.router.navigateByUrl('/edit-productions');
  }
  
  fetchProfileData(userId: string): void {
    const url = "http://localhost:8080/api/users/getUserId?id=" + userId;
    this.http.get(url).subscribe(
      {
        next: (response: any) =>{
          this.profile = response.result;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  fetchProfileCommentsData(userId: string): void {
    const url = "http://localhost:8080/api/comments/getCommentsUser?id=" + userId;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.comments = response.result.map((comment: any) => ({
            _id: comment._id,
            id_user: comment.id_user,
            id_production: comment.id_production,
            comment: comment.comment, 
            stars: comment.stars
          }));
        } else {
          this.comments = [];
        }
      },
      (error) => {
        console.log('Error fetching profile data:', error);
      }
    );
  }

  getMySelf(): void{
    if(this.userId == this.userlog.getData()._id){
      this.mySelf = true;
    } else {
      this.mySelf = false;
    }
  }
}
