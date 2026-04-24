import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { ExperienceService, Experience } from '../../services/experience';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
  experience?: Experience;
  isFavorite = false;
  saveLabel = 'Guardar';

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.experience = this.experienceService.getExperienceById(id);
      this.isFavorite = this.favoritesService.isFavorite(id);
      this.updateSaveLabel();
    }
  }

  toggleFavorite(): void {
    if (!this.experience) return;
    this.favoritesService.toggle(this.experience.id);
    this.isFavorite = this.favoritesService.isFavorite(this.experience.id);
    this.updateSaveLabel();
  }

  private updateSaveLabel(): void {
    this.saveLabel = this.isFavorite ? 'Guardado' : 'Guardar';
  }
}
