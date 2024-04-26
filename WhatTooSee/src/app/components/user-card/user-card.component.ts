import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../interfaces/profile-information.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})

export class UserCardComponent {
  @Input() profile: Profile | undefined;

  constructor(private router: Router, private http : HttpClient) { 
  }

  redirectToProfile(userId: string): void {
    this.router.navigate(['/profile', userId]);
  }

}
