import { Component } from '@angular/core';
import { BannerCarouselComponent } from '../../components/banner-carousel/banner-carousel.component';
import { PosterCarouselComponent } from '../../components/poster-carousel/poster-carousel.component';
import { HttpClient } from '@angular/common/http';
import { Production } from '../../interfaces/production.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ BannerCarouselComponent, PosterCarouselComponent, NgIf ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  productions: Production[] = [];
  bestMovies: Production[] = [];
  premiereMovies: Production[] = [];
  bestSeries: Production[] = [];
  newSeries: Production[] = [];
  productionsClassified: boolean = false;
  
  constructor(private http: HttpClient) {
    this.fetchProductionsData();
  }

  fetchProductionsData(): void{
    const url = "http://localhost:8080/api/productions/getProductions";
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response) {
          this.productions = response.result;
          this.classifyProductions();
          this.productionsClassified = true;
        } else {
          this.productions = [];
        }
      },
      (error) => {
        console.log('Error fetching production data:', error);
      }
    );
  }

  classifyProductions(): void {
    this.bestMovies = this.productions.filter(prod => prod.best_movie);
    this.premiereMovies = this.productions.filter(prod => prod.premier_movie);
    this.bestSeries = this.productions.filter(prod => prod.best_serie);
    this.newSeries = this.productions.filter(prod => prod.new_serie);
  }
}
