import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  formSubmitted = false;
  formSuccess = false;

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) return;
    this.formSuccess = true;
    form.resetForm();
    this.formSubmitted = false;
    setTimeout(() => { this.formSuccess = false; }, 4000);
  }
}
