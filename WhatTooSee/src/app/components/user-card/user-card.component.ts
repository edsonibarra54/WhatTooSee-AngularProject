import { Component, Input, HostListener,  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})

export class UserCardComponent {
  @Input() data: string ="";

  constructor() { }

}
