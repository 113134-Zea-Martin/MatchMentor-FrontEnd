import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatchService } from '../../services/match.service';
import { UserResponseDTO, UserResponseDTOData } from '../../../profile/models/user-response-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutor-card.component.html',
  styleUrl: './tutor-card.component.css'
})
export class TutorCardComponent implements OnInit, OnDestroy {


  userId: number = 0; // Property to store the user ID
  token: string = ''; // Property to store the token
  tutorProfile?: UserResponseDTO; // Property to store the tutor profile data
  tutorProfileData?: UserResponseDTOData; // Property to store the tutor profile data

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('idProfile')); // Get the user ID from local storage
    console.log('User ID:', this.userId); // Log the user ID for debugging
    this.token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    console.log('Token:', this.token); // Log the token for debugging
    this.loadTutorProfile(); // Load the tutor profile when the component initializes
  }

  onConnect(isLike: boolean) {
    const sub = this.matchService.createMatch(this.token, this.userId, this.tutorProfileData?.id || 0, isLike).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Match created successfully:', response.message); // Log success message for debugging
        } else {
          console.error('Error creating match:', response.message); // Log error message for debugging
        }
        console.log('Match created:', isLike); // Log the match creation for debugging
        this.loadTutorProfile(); // Reload the tutor profile after creating a match
        console.log('Reloading tutor profile after match creation' + this.tutorProfileData); // Log the tutor profile data for debugging
      },
      error: (error) => {
        console.error('Error de server:', error); // Log error message for debugging
      }
    });
    this.subscriptions.push(sub); // Add the subscription to the array for cleanup

  }


  subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  constructor(private matchService: MatchService) { } // Constructor for the component

  loadTutorProfile(): void {
    const token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    const sub = this.matchService.getNextTutorCompatibleWithStudent(this.token, this.userId).subscribe({
      next: (response: UserResponseDTO) => {
        if (response.success) {
          this.tutorProfile = response; // Assign the tutor profile data to the component property
          this.tutorProfileData = response.data; // Assign the tutor profile data to the component property
          console.log('Tutor profile loaded:', this.tutorProfileData);
        } else {
          this.tutorProfileData = undefined; // Set the tutor profile data to undefined if the response is not successful
          console.error('Error loading tutor profile:', response.message);
        }
      },
      error: (error) => {
        console.error('Error loading tutor profile:', error);
      }
    });
    this.subscriptions.push(sub); // Add the subscription to the array for cleanup
  }

  calculateAge(birthDateString: string | null | undefined): number | null {
    if (!birthDateString) {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
