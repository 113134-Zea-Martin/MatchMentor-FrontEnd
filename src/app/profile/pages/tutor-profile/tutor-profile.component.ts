import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileResponse, TutorProfile } from '../../models/profile-response';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponseDTOData, UserResponseDTO } from '../../models/user-response-dto';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutor-profile.component.html',
  styleUrl: './tutor-profile.component.css'
})
export class TutorProfileComponent implements OnInit,OnDestroy {

  onEditProfile(idTutor: number): void {
    // Guardamos el ID del tutor en el almacenamiento local o en un servicio
    // localStorage.setItem('idProfile', idTutor.toString());
    // Por ejemplo, utilizando el router de Angular
    this.router.navigate(['/edit-profile']);
  }
  @Input() idTutor: number = 0; // Input property to receive the tutor ID from the parent component

  token: string = ''; // Property to store the token

  constructor(private userService: UserService, private router: Router) {
  }

  tutorProfile?: UserResponseDTO
  tutorProfileData?: UserResponseDTOData

  subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Initialize the token from local storage
    console.log('Token:', this.token); // Log the token for debugging
    // Load the tutor profile when the component initializes
    this.loadTutorProfile();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTutorProfile(): void {
    const token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    const sub = this.userService.getUserById(this.idTutor, this.token).subscribe({
      next: (response: UserResponseDTO) => {
        if (response.success) {
          this.tutorProfile = response; // Assign the tutor profile data to the component property
          this.tutorProfileData = response.data; // Assign the tutor profile data to the component property
          console.log('Tutor profile loaded:', this.tutorProfileData);
        } else {
          console.error('Error loading tutor profile:', response.message);
        }
      },
      error: (error) => {
        console.error('Error loading tutor profile:', error);
      }
    });
    this.subscriptions.push(sub); // Add the subscription to the array for cleanup
  }
}
