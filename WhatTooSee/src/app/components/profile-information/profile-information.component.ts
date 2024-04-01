import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent {
  selectHeart(event: Event) {
    const clickedHeart = event.target as HTMLElement;

    // Cambiar la clase del corazón clicado
    if (clickedHeart.classList.contains('corazon-vacio')) {
        clickedHeart.classList.remove('corazon-vacio');
        clickedHeart.classList.add('corazon-lleno');
    } else {
        clickedHeart.classList.remove('corazon-lleno');
        clickedHeart.classList.add('corazon-vacio');
    }
  }
}
