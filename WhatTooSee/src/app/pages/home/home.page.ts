import { Component } from '@angular/core';
import { BannerCarouselComponent } from '../../components/banner-carousel/banner-carousel.component';
import { PosterCarouselComponent } from '../../components/poster-carousel/poster-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ BannerCarouselComponent, PosterCarouselComponent ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  
}
