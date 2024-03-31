import { Component } from '@angular/core';
import { ProductionCardComponent } from '../../components/production-card/production-card.component';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [ ProductionCardComponent ],
  templateUrl: './production.page.html',
  styleUrl: './production.page.css'
})
export class ProductionPage {
  ngOnInit(): void {
    const title = document.getElementById('title-Container') as HTMLElement;
    const label = document.getElementById('search-Label') as HTMLElement;
    const btn = document.getElementById('btn') as HTMLElement;
    const btnL = document.getElementById('btn-Left') as HTMLElement;
    const btnR = document.getElementById('btn-Right') as HTMLElement;

    btnL.addEventListener('click', () => {
        btn.style.left = '0';
        btnL.style.color = '#fff';
        btnR.style.color = '#000';
        title.textContent = 'Movies';
        label.textContent = 'Search for movies';
    });

    btnR.addEventListener('click', () => {
        btn.style.left = '45%';
        btnR.style.color = '#fff';
        btnL.style.color = '#000';
        title.textContent = 'Series';
        label.textContent = 'Search for series';
    });
  }
}
