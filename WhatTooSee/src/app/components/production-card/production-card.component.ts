import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-production-card',
  standalone: true,
  imports: [ RouterOutlet, RouterLink ],
  templateUrl: './production-card.component.html',
  styleUrl: './production-card.component.css'
})
export class ProductionCardComponent {

}
