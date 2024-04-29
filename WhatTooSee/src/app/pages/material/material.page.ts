import { Component } from '@angular/core';
import { CommentaryBoxComponent } from '../../components/commentary-box/commentary-box.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Production } from '../../interfaces/production.interface';
import { CommonModule, Location } from '@angular/common';
import { CommentsUser } from '../../interfaces/comments-user.interface';

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

  constructor(private router: Router, private http : HttpClient, private location: Location) {
    const url = this.location.path();
    const segments = url.split('/');
    this.productionId = segments[segments.length - 1];
    console.log(this.productionId);
    this.fetchProductionData(this.productionId);
    this.fetchProfileCommentsData(this.productionId);
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

  fetchProfileCommentsData(userId: string): void {
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

  selectStar(event: Event) {
    const clickedStar = event.target as HTMLElement;

    // Obtener todos los íconos dentro del contenedor
    const stars = document.getElementById("cal-Stars")!.getElementsByTagName("i") as HTMLCollectionOf<HTMLElement>;

    // Obtener el índice del ícono clicado
    const clickedIndex = Array.from(stars).indexOf(clickedStar);

    // Iterar sobre los íconos y aplicar estilos según el índice
    for (let i = 0; i <= clickedIndex; i++) {
      stars[i].style.color = "#FFA500";
    }

    // Restablecer el color de los íconos a la izquierda del clicado
    for (let j = clickedIndex + 1; j < stars.length; j++) {
      stars[j].style.color = "";
    }
  }
}
