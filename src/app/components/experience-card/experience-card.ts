import { Component, Input } from '@angular/core';
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
}
