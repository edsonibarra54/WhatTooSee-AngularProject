import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})

export class UserCardComponent {
  @Input() data: string ="";

  constructor(private router: Router) { }

  redirectToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
