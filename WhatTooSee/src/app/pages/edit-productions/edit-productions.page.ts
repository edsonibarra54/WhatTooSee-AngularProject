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

  public editProductionSelectedType: string = 'movie';

  constructor(private http: HttpClient) {

  }

  onTypeChange() {
    this.newProductionBestMovie = false;
    this.newProductionPremierMovie = false;
    this.newProductionBestSerie = false;
    this.newProductionNewSerie = false;
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
      hasBanner: this.newProductionshowBanner
    };

    this.http.post<any>(url, productionData).subscribe(
      (response) => {
        console.log('Production added successfully:', response);
        this.mostrarExito("Production added successfully");
      },
      (error) => {
        console.log('Error adding production:', error);
        if (error.status === 400) {
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

    if (!this.deleteProductionID || !this.confirmProductionID){
      this.mostrarError("You need to fill both inputs");
      return;
    }

    if (this.deleteProductionID == this.confirmProductionID){
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
          if (error.status === 404) {
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
  
    setTimeout(function() {
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
  
    setTimeout(function() {
      document.body.removeChild(mensajeError);
    }, 5000); 
  }
}
