import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Experience } from '../../services/experience';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css'
})
export class ExperienceCardComponent {
  @Input() experience!: Experience;
  @Input() isFavorite = false;
  @Output() favoriteToggled = new EventEmitter<string>();

  onFavoriteClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggled.emit(this.experience.id);
  }
}
