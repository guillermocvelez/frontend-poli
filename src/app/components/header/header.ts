import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Desktop Header -->
    <header class="top-navbar desktop-only">
        <div class="navbar-container">
            <div class="navbar-brand">
                <div class="brand-logo" routerLink="/">VerantTravel</div>
                <nav class="nav-links">
                    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
                    <a routerLink="/catalog" routerLinkActive="active">Destinos</a>
                    <a routerLink="/about" routerLinkActive="active">Nosotros</a>
                </nav>
            </div>

            <div class="navbar-actions">
                <div class="search-box">
                    <span class="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar experiencia..."/>
                </div>
                <button class="btn-login">Ingresar</button>
                <button class="btn-register">Registrarse</button>
            </div>
        </div>
    </header>

    <!-- Mobile Header -->
    <header class="mobile-header mobile-only">
        <div class="mobile-header-container">
            <details #mobileMenu class="mobile-menu-dropdown">
                <summary class="mobile-menu-btn">
                    <span class="material-symbols-outlined">menu</span>
                </summary>
                <nav class="mobile-menu-panel">
                    <a routerLink="/" (click)="closeMenu()">Inicio</a>
                    <a routerLink="/catalog" (click)="closeMenu()">Destinos</a>
                    <a routerLink="/about" (click)="closeMenu()">Nosotros</a>
                </nav>
            </details>

            <h1 class="mobile-brand" routerLink="/">VERANT</h1>

            <button class="mobile-search-btn">
                <span class="material-symbols-outlined">search</span>
            </button>
        </div>
    </header>
  `,
  styles: [`
    .desktop-only { display: none; }
    .mobile-only { display: block; }

    @media (min-width: 1024px) {
      .desktop-only { display: block; }
      .mobile-only { display: none; }
    }

    .brand-logo, .mobile-brand {
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  @ViewChild('mobileMenu') mobileMenuRef?: ElementRef<HTMLDetailsElement>;

  closeMenu() {
    if (this.mobileMenuRef?.nativeElement) {
      this.mobileMenuRef.nativeElement.removeAttribute('open');
    }
  }
}
