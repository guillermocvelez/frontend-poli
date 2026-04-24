import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { ExperienceService, Experience } from '../../services/experience';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    ExperienceCardComponent
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  allExperiences: Experience[] = [];
  filteredExperiences: Experience[] = [];
  activeCategory = 'todas';
  searchText = '';
  categories = ['todas', 'senderismo', 'cultura', 'relax', 'aventura'];

  constructor(
    private experienceService: ExperienceService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.allExperiences = this.experienceService.getExperiences();
    this.applyFilters();
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  onFavoriteToggled(id: string): void {
    this.favoritesService.toggle(id);
  }

  private applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    this.filteredExperiences = this.allExperiences.filter(exp => {
      const matchCategory =
        this.activeCategory === 'todas' || exp.category === this.activeCategory;
      const matchSearch =
        !search ||
        exp.title.toLowerCase().includes(search) ||
        exp.description.toLowerCase().includes(search);
      return matchCategory && matchSearch;
    });
  }
}
