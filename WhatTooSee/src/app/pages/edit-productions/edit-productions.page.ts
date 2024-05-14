import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Production } from '../../interfaces/production.interface';
import { AuthService } from '../../services/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-productions',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit-productions.page.html',
  styleUrl: './edit-productions.page.css'
})
export class EditProductionsPage {
  public newProductionSelectedType: string = 'movie';
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
  public newProductionTypeProd: number = 1;
  public newProductionPoster: string = "";
  public newProductionBanner: string = "";
  public newProductionshowBanner: boolean = false;
  public newProductionClassification: string = "";

  public deleteProductionID: string = "";
  public confirmProductionID: string = "";

  public isFound: boolean = false;
  public updateProductionID: string = "";
  public updateStaticProductionID: string = "";
  public updateProductionSelectedType: string = 'movie';
  public updateProductionName: string = "";
  public updateProductionRating: number = 0;
  public updateProductionGenre: string[] = [];
  public updateProductionDirector: string = "";
  public updateProductionWriter: string = "";
  public updateProductionCast: string[] = [];
  public updateProductionRelease: string = "";
  public updateProductionRuntime: number = 0;
  public updateProductionBestMovie: boolean = false;
  public updateProductionBestSerie: boolean = false;
  public updateProductionPremierMovie: boolean = false;
  public updateProductionNewSerie: boolean = false;
  public updateProductionTypeProd: number = 1;
  public updateProductionPoster: string = "";
  public updateProductionBanner: string = "";
  public updateProductionshowBanner: boolean = false;
  public updateProductionClassification: string = "";

  constructor(private http: HttpClient, public authService: AuthService, private router: Router) {

  }

  onTypeChange() {
    this.newProductionBestMovie = false;
    this.newProductionPremierMovie = false;
    this.newProductionBestSerie = false;
    this.newProductionNewSerie = false;
    this.updateProductionBestMovie = false;
    this.updateProductionPremierMovie = false;
    this.updateProductionBestSerie = false;
    this.updateProductionNewSerie = false;
  }

  splitText(text: string): string[] {
    return text.split(',').map(genre => genre.trim());
  }

  public onClickCreate(): void {
    console.log("Creando Pelicula/Serie");
    const url = "http://localhost:8080/api/productions/createProduction";

    let selectElement = document.getElementById("typeSelect") as HTMLSelectElement;
    if (selectElement) {
      this.newProductionTypeProd = selectElement.value === "movie" ? 1 : 2;
    }

    this.newProductionRating = parseFloat(this.newProductionRating.toFixed(1));
    if (isNaN(this.newProductionRating) || this.newProductionRating < 0 || this.newProductionRating > 10) {
      console.log("Invalid rating. Rating must be a number between 0 and 10.");
      this.mostrarError("Rating must be a number between 0 and 10");
      return;
    }

    this.newProductionRuntime = parseFloat(this.newProductionRuntime.toFixed(0));
    if (isNaN(this.newProductionRuntime) || this.newProductionRuntime < 1 || this.newProductionRuntime > 500) {
      console.log("Invalid runtime. Runtime must be a number between 1 and 500.");
      this.mostrarError("Runtime must be a number between 1 and 500");
      return;
    }

    if (!this.newProductionshowBanner) {
      this.newProductionBanner = "";
    }

    const productionData = {
      name: this.newProductionName,
      rating: this.newProductionRating,
      genre: this.splitText(this.newProductionGenre[0]),
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
      hasBanner: this.newProductionshowBanner
    };

    this.http.post<any>(url, productionData).subscribe(
      (response) => {
        console.log('Production added successfully:', response);
        this.mostrarExito("Production added successfuly");

        this.newProductionSelectedType = 'movie';
        this.newProductionName = "";
        this.newProductionRating = 0;
        this.newProductionGenre = [];
        this.newProductionDirector = "";
        this.newProductionWriter = "";
        this.newProductionCast = [];
        this.newProductionRelease = "";
        this.newProductionRuntime = 0;
        this.newProductionBestMovie = false;
        this.newProductionBestSerie = false;
        this.newProductionPremierMovie = false;
        this.newProductionNewSerie = false;
        this.newProductionTypeProd = 1;
        this.newProductionPoster = "";
        this.newProductionBanner = "";
        this.newProductionshowBanner = false;
        this.newProductionClassification = "";
      },
      (error) => {
        console.log('Error adding production:', error);
        if (error.status === 401) {
          this.mostrarError("You are not authenticated");
          this.authService.cleanData();
          this.redirectToHome();
        } else if (error.status === 400) {
          this.mostrarError("You need to fill all the inputs");
        } else {
          this.mostrarError("Error adding production");
        }
      }
    );
  }

  public onClickDelete(): void {
    console.log("Eliminando Pelicula/Serie");
    const url = "http://localhost:8080/api/productions/deleteProduction";
    const urlComments = "http://localhost:8080/api/comments/deleteComments";

    if (!this.deleteProductionID || !this.confirmProductionID) {
      this.mostrarError("You need to fill both inputs");
      return;
    }

    if (this.deleteProductionID == this.confirmProductionID) {
      const production = {
        _id: this.deleteProductionID
      }

      const comments = {
        id_production: this.deleteProductionID
      }

      this.http.delete<any>(url, { body: production }).subscribe(
        (response) => {
          console.log('Produccion eliminada correctamente:', response);
          this.mostrarExito("Production deleted successfully");

          this.deleteProductionID = "";
          this.confirmProductionID = "";

          this.http.delete<any>(urlComments, { body: comments }).subscribe(
            (response) => {
              console.log('Comentarios eliminados correctamente:', response);
            },
            (error) => {
              console.log('Error eliminando comentarios:', error);
            }
          );
        },
        (error) => {
          console.log('Error eliminando show:', error);
          if (error.status === 401) {
            this.mostrarError("You are not authenticated");
            this.authService.cleanData();
            this.redirectToHome();
          } else if (error.status === 404) {
            this.mostrarError("Can't find production");
          } else {
            this.mostrarError("Error deleting production");
          }
        }
      );
    } else {
      console.log("El Id debe ser el mismo");
      this.mostrarError("The Id needs to be the same");
    }
  }

  public onClickSearch(): void {
    console.log("Searching for production");
    this.isFound = false;

    if (!this.updateProductionID) {
      this.mostrarError("You need to insert a production ID");
      return;
    }

    const url = "http://localhost:8080/api/productions/getProduction?id=" + this.updateProductionID;
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Production found', response);
        if (response) {
          const productionData = response.production;
    
          this.updateStaticProductionID = this.updateProductionID;
          this.updateProductionSelectedType = productionData.type_prod === 1 ? 'movie' : 'series';
          this.updateProductionName = productionData.name;
          this.updateProductionRating = productionData.rating;
          this.updateProductionGenre = productionData.genre;
          this.updateProductionDirector = productionData.director;
          this.updateProductionWriter = productionData.writer;
          this.updateProductionCast = productionData.cast;
          this.updateProductionRelease = productionData.release;
          this.updateProductionRuntime = productionData.runtime;
          this.updateProductionBestMovie = productionData.best_movie;
          this.updateProductionBestSerie = productionData.best_serie;
          this.updateProductionPremierMovie = productionData.premier_movie;
          this.updateProductionNewSerie = productionData.new_serie;
          this.updateProductionTypeProd = productionData.type_prod;
          this.updateProductionPoster = productionData.poster;
          this.updateProductionshowBanner = productionData.hasBanner;
          this.updateProductionBanner = productionData.banner;
          this.updateProductionClassification = productionData.classification;
          this.isFound = true;
        } else {
          this.mostrarError("Can't find production");
        }
      },
      error: (error: any) => {
        console.log('Error searching for production:', error);
        if (error.status === 404) {
          this.mostrarError("Can't find production");
        } else {
          this.mostrarError("Error finding production");
        }
      }
    });
  }

  public onClickUpdate(): void{
    console.log("Se intenta actualizar la produccion");
    const url = "http://localhost:8080/api/productions/updateProduction";

    let selectElement = document.getElementById("updateTypeSelect") as HTMLSelectElement;
    if (selectElement) {
      this.updateProductionTypeProd = selectElement.value === "movie" ? 1 : 2;
    }

    this.updateProductionRating = parseFloat(this.updateProductionRating.toFixed(1));
    if (isNaN(this.updateProductionRating) || this.updateProductionRating < 0 || this.updateProductionRating > 10) {
      console.log("Invalid rating. Rating must be a number between 0 and 10.");
      this.mostrarError("Rating must be a number between 0 and 10");
      return;
    }

    this.updateProductionRuntime = parseFloat(this.updateProductionRuntime.toFixed(0));
    if (isNaN(this.updateProductionRuntime) || this.updateProductionRuntime < 1 || this.updateProductionRuntime > 500) {
      console.log("Invalid runtime. Runtime must be a number between 1 and 500.");
      this.mostrarError("Runtime must be a number between 1 and 500");
      return;
    }

    if (!this.updateProductionshowBanner) {
      this.updateProductionBanner = "";
    }

    console.log(this.updateProductionGenre);
    console.log(this.updateProductionGenre);
    console.log(this.splitText(this.updateProductionGenre[0]));

    const productionData = {
      _id: this.updateStaticProductionID,
      name: this.updateProductionName,
      rating: this.updateProductionRating,
      genre: this.splitText(this.updateProductionGenre[0]),
      director: this.updateProductionDirector,
      writer: this.updateProductionWriter,
      cast: this.updateProductionCast,
      release: this.updateProductionRelease,
      runtime: this.updateProductionRuntime,
      best_movie: this.updateProductionBestMovie,
      best_serie: this.updateProductionBestSerie,
      premier_movie: this.updateProductionPremierMovie,
      new_serie: this.updateProductionNewSerie,
      type_prod: this.updateProductionTypeProd,
      poster: this.updateProductionPoster,
      banner: this.updateProductionBanner,
      classification: this.updateProductionClassification,
      hasBanner: this.updateProductionshowBanner
    };

    console.log(productionData);

    this.http.put<any>(url,productionData).subscribe(
      (response) => {
        console.log('Production updated successfuly:', response);
        this.mostrarExito("Production updated successfuly");
        this.isFound = false;
        this.updateProductionID = "";
      },
      (error) => {
        console.log('Error updating production:', error);
        if (error.status === 401) {
          this.mostrarError("You are not authenticated");
          this.authService.cleanData();
          this.redirectToHome();
        } else if (error.status === 404) {
          this.mostrarError("Can't find production");
        } else {
          this.mostrarError("Error updating production");
        }
      }
    );
  }

  mostrarExito(msg: string) {
    var mensajeError = document.createElement("div");
    mensajeError.textContent = msg;
    mensajeError.style.backgroundColor = "#02BB86";
    mensajeError.style.color = "white";
    mensajeError.style.padding = "15px";
    mensajeError.style.position = "fixed";
    mensajeError.style.top = "20px";
    mensajeError.style.left = "50%";
    mensajeError.style.transform = "translateX(-50%)";
    mensajeError.style.borderRadius = "5px";
    mensajeError.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    mensajeError.style.zIndex = "9999";
    document.body.appendChild(mensajeError);

    setTimeout(function () {
      document.body.removeChild(mensajeError);
    }, 5000);
  }

  mostrarError(msg: string) {
    var mensajeError = document.createElement("div");
    mensajeError.textContent = msg;
    mensajeError.style.backgroundColor = "red";
    mensajeError.style.color = "white";
    mensajeError.style.padding = "10px";
    mensajeError.style.position = "fixed";
    mensajeError.style.top = "20px";
    mensajeError.style.left = "50%";
    mensajeError.style.transform = "translateX(-50%)";
    mensajeError.style.borderRadius = "5px";
    mensajeError.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    mensajeError.style.zIndex = "9999";
    document.body.appendChild(mensajeError);

    setTimeout(function () {
      document.body.removeChild(mensajeError);
    }, 5000);
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
