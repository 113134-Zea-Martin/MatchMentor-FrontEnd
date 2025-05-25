import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/pages/login/login.component";
import { NavbarComponent } from "./navbar/navbar/navbar.component";
import { UserActivityService } from './auth/services/user-activity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mentor-match-front';
  constructor(private userActivityService: UserActivityService) { }
}
