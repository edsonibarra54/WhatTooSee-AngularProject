import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './community.page.html',
  styleUrl: './community.page.css'
})
export class CommunityPage {
  userData: string = "User"
}
