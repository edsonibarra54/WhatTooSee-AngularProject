import { Component, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-poster-carousel',
  standalone: true,
  imports: [],
  templateUrl: './poster-carousel.component.html',
  styleUrl: './poster-carousel.component.css'
})
export class PosterCarouselComponent {
  @Input() carouselId: string = 'movieSlider';

  constructor(private elRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef ) {}

  ngAfterViewInit(): void {
    const carousel = this.elRef.nativeElement.querySelector('#posterCarouselBase');
    const splideContainer = this.elRef.nativeElement.querySelector('#splideContainer');
    let h: number;

    const observerCarousel = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        h = width / 1.8618;
        this.renderer.setStyle(carousel, 'height', `${h}px`);
        this.renderer.setStyle(splideContainer, 'height', `${h}px`);
      }
    });

    observerCarousel.observe(carousel);
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      const splide1 = new Splide('#movieSlider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        snap: true,
        autoplay: true,
      });

      splide1.mount();

      const splide2 = new Splide('#movieSlider2', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        snap: true,
        autoplay: true,
      });

      splide2.mount();

      const splide3 = new Splide('#movieSlider3', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        snap: true,
        autoplay: true,
      });

      splide3.mount();

      const splide4 = new Splide('#movieSlider4', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        snap: true,
        autoplay: true,
      });

      splide4.mount();
    });
  }

}
