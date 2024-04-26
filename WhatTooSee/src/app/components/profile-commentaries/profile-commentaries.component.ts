import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommentsUser } from '../../interfaces/comments-user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-commentaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-commentaries.component.html',
  styleUrl: './profile-commentaries.component.css'
})
export class ProfileCommentariesComponent {

  @Input() comment: CommentsUser | undefined;

  starsArray: Number[] = [];

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    if (this.comment) {
      this.starsArray = this.getStarsArray(this.comment.stars);
    }
  }

  redirectToProduction() {
    this.router.navigateByUrl('/material');
  }

  getStarsArray(rating: Number): Number[] {
    return Array(rating).fill(0);
  }
}
