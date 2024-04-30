import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommentsUser } from '../../interfaces/comments-user.interface';
import { Profile } from '../../interfaces/profile-information.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commentary-box',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './commentary-box.component.html',
  styleUrl: './commentary-box.component.css'
})
export class CommentaryBoxComponent {
  @Input() comment: CommentsUser | undefined; 

  profile!: Profile;

  constructor(private router: Router, private http : HttpClient) { 

  }

  ngOnInit(): void {
    if (this.comment) {
      this.fetchProfileData(this.comment.id_user);
    }
  }

  redirectToProfile() {
    this.router.navigate(['/profile', this.profile._id]);
  }

  getStarsArray(rating: Number): Number[] {
    return Array(rating).fill(0);
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
}
