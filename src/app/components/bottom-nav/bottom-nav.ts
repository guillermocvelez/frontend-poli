import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="mobile-bottom-nav mobile-only">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="mobile-nav-item">
            <span class="material-symbols-outlined">home</span>
            <span class="mobile-nav-label">Home</span>
        </a>
        <a routerLink="/catalog" routerLinkActive="active" class="mobile-nav-item">
            <span class="material-symbols-outlined">explore</span>
            <span class="mobile-nav-label">Destinos</span>
        </a>
        <a routerLink="/about" routerLinkActive="active" class="mobile-nav-item">
            <span class="material-symbols-outlined">groups</span>
            <span class="mobile-nav-label">Nosotros</span>
        </a>
    </nav>
  `,
  styles: [`
    .mobile-only { display: block; }
    @media (min-width: 1024px) {
      .mobile-only { display: none; }
    }
  `]
})
export class BottomNavComponent {}
