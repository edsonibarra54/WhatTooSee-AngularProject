import { NgIf } from '@angular/common';
import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, NgIf ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
  public isSecondListVisible: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const menuTop = this.elRef.nativeElement.querySelector('#menu-top');
    const secondList = this.elRef.nativeElement.querySelector('#secondListDiv');
    let h: number;

    const observerMenuTop = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        h = width / 13.65;
        console.log('Calculated height:', h);
        this.renderer.setStyle(menuTop, 'height', `${h}px`);
        this.renderer.setStyle(secondList, 'margin-top', `${h}px`);
      }
    });

    observerMenuTop.observe(menuTop);
  }

  public toggleSecondList(): void {
    this.isSecondListVisible = !this.isSecondListVisible;

    const secondList = this.elRef.nativeElement.querySelector('#secondListDiv');

    const displayValue = this.isSecondListVisible ? 'flex' : 'none';
    this.renderer.setStyle(secondList, 'display', displayValue);
  }
}
