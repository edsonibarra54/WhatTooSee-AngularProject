import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-productions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-productions.page.html',
  styleUrl: './edit-productions.page.css'
})
export class EditProductionsPage {
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
  public newProductionClassification: string = "";

  constructor(private http: HttpClient) {

  }

  public onClickCreate(): void {
    console.log("Creando Pelicula/Serie");
    const url = "http://localhost:8080/api/productions/createProduction";

    let selectElement = document.getElementById("typeSelect") as HTMLSelectElement;
    if (selectElement) {
      if (selectElement.value == "movie")
        this.newProductionTypeProd = 1;
      else
        this.newProductionTypeProd = 2;
    }

    if (this.newProductionRating > 10) {
      console.log("A rating cannot be bigger than 10");
      return;
    }
    this.newProductionRating = parseFloat(this.newProductionRating.toFixed(1));
    this.newProductionRuntime = parseFloat(this.newProductionRuntime.toFixed(0));

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
      classification: this.newProductionClassification
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
