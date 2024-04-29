import { Component } from '@angular/core';
import { ProductionCardComponent } from '../../components/production-card/production-card.component';
import { Production } from '../../interfaces/production.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [ ProductionCardComponent, CommonModule ],
  templateUrl: './production.page.html',
  styleUrl: './production.page.css'
})
export class ProductionPage {
  productions: Production[] = [];
  
  constructor(private http: HttpClient) {
    this.fetchProductionsData();
  }

  fetchProductionsData(): void{
    this.http.get<any>("http://localhost:8080/api/productions/getProductions").subscribe(
      (response) => {
        console.log(response);
        if (response && response.result && response.result.length > 0) {
          this.productions = response.result.map((production: any) => ({
            _id: production._id,
            name: production.name,
            rating: parseFloat(production.rating),
            genre: production.genre,
            poster: production.poster,
            type_prod: production.type_prod
          }));
        } else {
          this.productions = [];
        }
      },
      (error) => {
        console.log('Error fetching production data:', error);
      }
    );
  }

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
