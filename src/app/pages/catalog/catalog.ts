import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { ExperienceService, Experience } from '../../services/experience';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    ExperienceCardComponent
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.experiences = this.experienceService.getExperiences();
  }
}
