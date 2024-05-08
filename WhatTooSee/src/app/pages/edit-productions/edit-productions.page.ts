import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-productions',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit-productions.page.html',
  styleUrl: './edit-productions.page.css'
})
export class EditProductionsPage {
  public selectedType: string = 'movie';
  public newProductionName: string = "";
  public newProductionRating: number = 0;
  public newProductionGenre: string[] = [];
  public newProductionDirector: string = "";
  public newProductionWriter: string = "";
  public newProductionCast: string[] = [];
  public newProductionRelease: string = "";
  public newProductionRuntime: number = 0;
  public newProductionBestMovie: boolean = false;
  public newProductionBestSerie: boolean = false;
  public newProductionPremierMovie: boolean = false;
  public newProductionNewSerie: boolean = false;
  public newProductionTypeProd: number = 0;
  public newProductionPoster: string = "";
  public newProductionBanner: string = "";
  public newProductionshowBanner: boolean = false;
  public newProductionClassification: string = "";

  constructor(private http: HttpClient) {

  }

  onTypeChange() {
    if (this.selectedType === 'movie') {
      this.newProductionBestMovie = false;
      this.newProductionPremierMovie = false;
    } else if (this.selectedType === 'series') {
      this.newProductionBestSerie = false;
      this.newProductionNewSerie = false;
    }
  }

  public onClickCreate(): void {
    console.log("Creando Pelicula/Serie");
    const url = "http://localhost:8080/api/productions/createProduction";

    let selectElement = document.getElementById("typeSelect") as HTMLSelectElement;
    if (selectElement) {
      if (selectElement.value == "movie")
        this.newProductionTypeProd = selectElement.value === "movie" ? 1 : 2;
    }

    this.newProductionRating = parseFloat(this.newProductionRating.toFixed(1));
    if (isNaN(this.newProductionRating) || this.newProductionRating < 0 || this.newProductionRating > 10) {
      console.log("Invalid rating. Rating must be a number between 0 and 10.");
      return;
    }

    this.newProductionRuntime = parseFloat(this.newProductionRuntime.toFixed(0));
    if (isNaN(this.newProductionRuntime) || this.newProductionRuntime < 1 || this.newProductionRuntime > 500) {
      console.log("Invalid runtime. Runtime must be a number between 1 and 500.");
      return;
    }

    if (!this.newProductionshowBanner) {
      this.newProductionBanner = "";
    }

    const productionData = {
      name: this.newProductionName,
      rating: this.newProductionRating,
      genre: this.newProductionGenre,
      director: this.newProductionDirector,
      writer: this.newProductionWriter,
      cast: this.newProductionCast,
      release: this.newProductionRelease,
      runtime: this.newProductionRuntime,
      best_movie: this.newProductionBestMovie,
      best_serie: this.newProductionBestSerie,
      premier_movie: this.newProductionPremierMovie,
      new_serie: this.newProductionNewSerie,
      type_prod: this.newProductionTypeProd,
      poster: this.newProductionPoster,
      banner: this.newProductionBanner,
      classification: this.newProductionClassification,
      hasPoster: this.newProductionshowBanner
    };

    this.http.post<any>(url, productionData).subscribe(
      (response) => {
        console.log('Production added successfully:', response);
      },
      (error) => {
        console.log('Error adding production:', error);
      }
    );
  }
}
