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
  splideInstances: Splide[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef ) {}

  ngAfterViewInit(): void {
    this.initializeSplide();

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

  initializeSplide(): void {
    const splideElement = this.elRef.nativeElement.querySelector('.splide');
    if (splideElement) {
      const splideInstance = new Splide(splideElement, {
        type: 'loop',
        drag: 'free',
        snap: true,
        autoplay: true,
      });

      const progressContainer = document.querySelector('.my-carousel-progress');
      const bar: HTMLElement | null = progressContainer ? progressContainer.querySelector('.my-carousel-progress-bar') as HTMLElement : null;

      splideInstance.on('mounted move', () => {
        const end = splideInstance.Components.Controller.getEnd() + 1;
        const rate = Math.min((splideInstance.index + 1) / end, 1);

        if (bar) {
          bar.style.width = String(100 * rate) + '%';
        }
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
