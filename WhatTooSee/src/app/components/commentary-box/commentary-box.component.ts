import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-commentary-box',
  standalone: true,
  imports: [],
  templateUrl: './commentary-box.component.html',
  styleUrl: './commentary-box.component.css'
})
export class CommentaryBoxComponent {

  constructor(private router: Router) { }

  redirectToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
