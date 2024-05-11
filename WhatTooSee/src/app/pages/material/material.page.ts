import { Component, ViewChild } from '@angular/core';
import { CommentaryBoxComponent } from '../../components/commentary-box/commentary-box.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Production } from '../../interfaces/production.interface';
import { CommonModule, Location } from '@angular/common';
import { CommentsUser } from '../../interfaces/comments-user.interface';
import { loggedUser } from '../../services/singletonuser.service';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [ CommentaryBoxComponent, CommonModule ],
  templateUrl: './material.page.html',
  styleUrl: './material.page.css'
})
export class MaterialPage {
  comments: CommentsUser[] = [];
  productionId: string;
  production!: Production;
  selectedStarsCount = 0;

  constructor(private router: Router, private http : HttpClient, private location: Location, public userlog: loggedUser) {
    const url = this.location.path();
    const segments = url.split('/');
    this.productionId = segments[segments.length - 1];
    console.log(this.productionId);
    this.fetchProductionData(this.productionId);
    this.fetchProductionCommentsData(this.productionId);
  }

  fetchProductionData(productionId: string): void {
    const url = "http://localhost:8080/api/productions/getProductionById?id=" + productionId;
    this.http.get(url).subscribe(
      {
        next: (response: any) =>{
          this.production = response.result;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  fetchProductionCommentsData(userId: string): void {
    const url = "http://localhost:8080/api/comments/getCommentsProduction?id=" + userId;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.comments = response.result.map((comment: any) => ({
            _id: comment._id,
            id_user: comment.id_user,
            id_production: comment.id_production,
            comment: comment.comment, 
            stars: comment.stars
          }));
        } else {
          this.comments = [];
        }
      },
      (error) => {
        console.log('Error fetching profile data:', error);
      }
    );
  }

  submitComment() {
    const url = "http://localhost:8080/api/comments/createComment";
    const area = document.getElementById(`text-Comment`) as HTMLTextAreaElement;

    if(area.value.length < 1){
      console.log("Se debe colocar un comentario")
      this.mostrarError("You need to write a review");
    } else if (this.selectedStarsCount < 1) {
      console.log("Se necesita seleccionar una calificacion")
      this.mostrarError("You need to give it a rate");
    } else {
      const commentData = {
        id_user: this.userlog.getData()._id,
        id_production: this.productionId,
        comment: area.value,
        stars: this.selectedStarsCount
      };
  
      this.http.post<any>(url, commentData).subscribe(
        (response) => {
          console.log('Comment submitted successfully:', response);
          this.fetchProductionCommentsData(this.productionId);
        },
        (error) => {
          console.log('Error submitting comment:', error);
          if (error.status === 401) {
            this.mostrarError("You need to be logged");
            this.redirectToLogin()
          } else {
            this.mostrarError("Error submitting comment");
          }
        }
      );
    }
  }

  selectStar(event: Event) {
    const clickedStar = event.target as HTMLElement;

    const stars = document.getElementById("cal-Stars")!.getElementsByTagName("i") as HTMLCollectionOf<HTMLElement>;

    const clickedIndex = Array.from(stars).indexOf(clickedStar);

    this.selectedStarsCount = 0;
    for (let i = 0; i < stars.length; i++) {
      if (i <= clickedIndex) {
        stars[i].style.color = "#FFA500";
        this.selectedStarsCount++;
      } else {
        stars[i].style.color = "";
      }
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
    }, 3000);
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
    }, 3000); 
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
