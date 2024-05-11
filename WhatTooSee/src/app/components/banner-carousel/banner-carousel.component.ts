import { Component, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import Splide from '@splidejs/splide';
import { Production } from '../../interfaces/production.interface';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.css'
})
export class BannerCarouselComponent {
  bannerProductions: Production[] = [];
  splideInstances: Splide[] = [];
  initialized: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef, private http: HttpClient, private router: Router ) {}

  fetchProductionsData(): void{
    const url = "http://localhost:8080/api/productions/getBannerProductions";
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response) {
          this.bannerProductions = response.result.map((production: any) => ({
            _id: production._id,
            banner: production.banner
          }));
        } else {
          this.bannerProductions = [];
        }
      },
      (error) => {
        console.log('Error fetching production data:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.fetchProductionsData();

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

  ngAfterViewChecked(): void {
    if (!this.initialized && this.bannerProductions.length > 0) {
      this.initializeSplide();
      this.initialized = true;
    }
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

  redirectToProduction(productionId: string): void {
    this.router.navigate(['/material', productionId]);
  }
}
