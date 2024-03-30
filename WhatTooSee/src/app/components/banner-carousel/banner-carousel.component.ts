import { Component, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.css'
})
export class BannerCarouselComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef ) {}

  ngAfterViewInit(): void {
    const banner = this.elRef.nativeElement.querySelector('#Banner');
    const splideContainer = this.elRef.nativeElement.querySelector('#splideContainer');
    let h: number;

    const observerMenuTop = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        h = width / 2;
        this.renderer.setStyle(banner, 'height', `${h}px`);
        this.renderer.setStyle(splideContainer, 'height', `${h}px`);
      }
    });

    observerMenuTop.observe(banner);
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      const splide1 = new Splide('.splide', {
        type: 'loop',
        drag: 'free',
        snap: true,
        autoplay: true,
      });

      const progressContainer = document.querySelector('.my-carousel-progress');
      const bar: HTMLElement | null = progressContainer ? progressContainer.querySelector('.my-carousel-progress-bar') as HTMLElement : null;

      splide1.on('mounted move', () => {
        const end = splide1.Components.Controller.getEnd() + 1;
        const rate = Math.min((splide1.index + 1) / end, 1);

        if (bar) {
          bar.style.width = String(100 * rate) + '%';
        }
      });

      splide1.mount();
    });
  }
}
