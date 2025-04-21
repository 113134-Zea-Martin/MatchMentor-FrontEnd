import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileResponse, TutorProfile } from '../../models/profile-response';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Data, UserResponseDTO } from '../../models/user-response-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutor-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutor-profile.component.html',
  styleUrl: './tutor-profile.component.css'
})
export class TutorProfileComponent implements OnInit,OnDestroy {

  @Input() idTutor: number = 0; // Input property to receive the tutor ID from the parent component

  constructor(private userService: UserService) { }

  tutorProfile?: UserResponseDTO
  tutorProfileData?: Data

  subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  ngOnInit(): void {
    // Load the tutor profile when the component initializes
    this.loadTutorProfile();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTutorProfile(): void {
    const token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    const sub = this.userService.getUserById(this.idTutor).subscribe({
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
