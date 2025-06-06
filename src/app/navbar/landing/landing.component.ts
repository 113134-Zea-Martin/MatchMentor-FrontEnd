import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TERMS_AND_CONDITIONS } from '../../auth/models/terms.const';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
showFAQ() {
  this.router.navigate(['/faq']);
}
  termsContent = TERMS_AND_CONDITIONS.content; // Contenido de los términos y condiciones

  constructor(private router: Router) { }

  register() {
    this.router.navigate(['/register']);
  }
}