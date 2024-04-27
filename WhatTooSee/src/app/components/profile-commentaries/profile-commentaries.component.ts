import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommentsUser } from '../../interfaces/comments-user.interface';
import { CommonModule } from '@angular/common';
import { Production } from '../../interfaces/production.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-commentaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-commentaries.component.html',
  styleUrl: './profile-commentaries.component.css'
})
export class ProfileCommentariesComponent {

  @Input() comment: CommentsUser | undefined; 
 
  production!: Production;

  starsArray: Number[] = [];

  constructor(private router: Router, private http : HttpClient) { 
    
  }

  ngOnInit(): void {
    if (this.comment) {
      this.starsArray = this.getStarsArray(this.comment.stars);
      this.fetchProductionData(this.comment.id_production);
    }
  }

  redirectToProduction() {
    this.router.navigateByUrl('/material');
  }

  getStarsArray(rating: Number): Number[] {
    return Array(rating).fill(0);
  }

  fetchProductionData(productionId: string): void {
    const url = "http://localhost:8080/api/productions/getProduction?id=" + productionId;
    this.http.get(url).subscribe(
      {
        next: (response: any) =>{
          this.production = response.result;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }
}
