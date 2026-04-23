import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { ExperienceService, Experience } from '../../services/experience';

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

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.experience = this.experienceService.getExperienceById(id);
    }
  }
}
