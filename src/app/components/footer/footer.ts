import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer>
        <div class="footer-container">
            <div class="footer-brand">
                <span class="footer-title">VerantTravel</span>
                <p>Conectando viajeros con la esencia más auténtica de Colombia y el mundo.</p>
            </div>
            
            <nav class="footer-links">
                <a routerLink="/privacy">Política de Privacidad</a>
                <a routerLink="/terms">Términos de Servicio</a>
                <a href="#" class="footer-link-highlight">Sostenibilidad</a>
                <a routerLink="/about">Contáctenos</a>
            </nav>
            
            <div class="footer-copyright">
                © 2024 VerantTravel Eje Cafetero. Proyecto Académico.
            </div>
        </div>
    </footer>
  `,
  styles: [`
    footer {
      margin-top: 48px;
    }
  `]
})
export class FooterComponent {}
