import { Component } from '@angular/core';
import { ProductionCardComponent } from '../../components/production-card/production-card.component';
import { Production } from '../../interfaces/production.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [ ProductionCardComponent, CommonModule, FormsModule ],
  templateUrl: './production.page.html',
  styleUrl: './production.page.css'
})
export class ProductionPage {
  productions: Production[] = [];
  productions2: Production[] = [];
  filteredProductions: Production[] = [];
  currentType: Number = 1;
  currentFilter: string = "";
  searchTerm: string = '';
  
  constructor(private http: HttpClient) {
    this.fetchProductionsData();
  }

  filterProductions() {
    console.log("Filtering productions");
    this.productions = this.productions2;
    
    this.filteredProductions = this.productions.filter((production) =>
      production.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.productions = this.filteredProductions;
  }

  changeType(type: Number){
    if (type == 1){
      this.currentType = 1;
      this.currentFilter = "";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a peliculas");
    } else {
      this.currentType = 2;
      this.currentFilter = "";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a series");
    }
  }

  changeGenre(type: Number){
    if (type == 1){
      this.currentFilter = "";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a todos");
    } else if (type == 2) {
      this.currentFilter = "Action";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a accion");
    } else if (type == 3) {
      this.currentFilter = "Comedy";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a comedia");
    } else if (type == 4) {
      this.currentFilter = "Romantic";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a romantico");
    } else if (type == 5) {
      this.currentFilter = "Horror";
      this.fetchProductionsData();
      console.log("Se debe hacer fetch a horror");
    }
  }

  fetchProductionsData(): void{
    const url = "http://localhost:8080/api/productions/getProductionsByType?type=" + this.currentType + "&genre=" + this.currentFilter;
    console.log(url);
    this.http.get<any>(url).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.productions = response.result.map((production: any) => ({
            _id: production._id,
            name: production.name,
            rating: parseFloat(production.rating),
            genre: production.genre,
            poster: production.poster,
            type_prod: production.type_prod
          }));

          this.productions2 = this.productions;
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
