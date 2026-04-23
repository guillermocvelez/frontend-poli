import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { ExperienceService, Experience } from '../../services/experience';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    ExperienceCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  featuredExperiences: Experience[] = [];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.featuredExperiences = this.experienceService.getExperiences().slice(0, 2);
  }
}
