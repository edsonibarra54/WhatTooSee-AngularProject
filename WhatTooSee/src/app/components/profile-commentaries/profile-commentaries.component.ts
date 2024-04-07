import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-commentaries',
  standalone: true,
  imports: [],
  templateUrl: './profile-commentaries.component.html',
  styleUrl: './profile-commentaries.component.css'
})
export class ProfileCommentariesComponent {
  constructor(private router: Router) { }

  redirectToProduction() {
    this.router.navigateByUrl('/material');
  }
}
