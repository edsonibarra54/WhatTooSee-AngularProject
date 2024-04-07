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

  splideInstances: Splide[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef ) {}

  ngAfterViewInit(): void {
    this.initializeSplide();

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

  ngOnDestroy(): void {
    this.destroySplide();
  }

  initializeSplide(): void {
    const splideElement = this.elRef.nativeElement.querySelector('.splide');
    if (splideElement) {
      const splideInstance = new Splide(splideElement, {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        snap: true,
        autoplay: true,
      });

      splideInstance.mount();
      this.splideInstances.push(splideInstance);
    }
  }

  destroySplide(): void {
    this.splideInstances.forEach(instance => {
      instance.destroy();
    });

    this.splideInstances = [];
  }
}
