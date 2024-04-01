import { Component } from '@angular/core';
import { CommentaryBoxComponent } from '../../components/commentary-box/commentary-box.component';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [ CommentaryBoxComponent ],
  templateUrl: './material.page.html',
  styleUrl: './material.page.css'
})
export class MaterialPage {
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
