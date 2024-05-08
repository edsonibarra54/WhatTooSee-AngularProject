import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Production } from '../../interfaces/production.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-production-card',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, CommonModule ],
  templateUrl: './production-card.component.html',
  styleUrl: './production-card.component.css'
})
export class ProductionCardComponent {
  @Input() production: Production | undefined;

  constructor(private router: Router, private http : HttpClient) { 
  }

  redirectToProduction(productionId: string): void {
    this.router.navigate(['/material', productionId]);
  }
}
