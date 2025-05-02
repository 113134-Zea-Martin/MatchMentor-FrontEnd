import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';
import { UserResponseDTOData } from '../../../profile/models/user-response-dto';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent implements OnInit, OnDestroy {

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

  onConnect(isAccepted: boolean) {
    const subs = this.matchService.updateMatch(this.token, this.idMatch, isAccepted).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Match updated successfully:', response); // Log success message for debugging
          this.router.navigate(['/explore/pendings']); // Navigate to the match page after updating the match
        } else {
          console.error('Error updating match:', response.message); // Log error message for debugging
        }
      },
      error: (error) => {
        console.error('Error de server:', error); // Log error message for debugging
      }
    });
    this.subscriptions.push(subs); // Add the subscription to the array for cleanup
  }

  idTutor: number = 0; // Property to store the tutor ID
  idStudent: number = 0; // Property to store the student ID
  idMatch: number = 0; // Property to store the match ID
  token: string = ''; // Property to store the token
  studentProfileData?: UserResponseDTOData; // Property to store the student profile data
  subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  constructor(private matchService: MatchService, private router: Router) { } // Constructor for the component

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.idTutor = Number(localStorage.getItem('idProfile')); // Get the tutor ID from local storage
    console.log('Tutor ID:', this.idTutor); // Log the tutor ID for debugging
    this.idStudent = Number(localStorage.getItem('idStudent')); // Get the student ID from local storage
    console.log('Student ID:', this.idStudent); // Log the student ID for debugging
    this.idMatch = Number(localStorage.getItem('idMatch')); // Get the match ID from local storage
    console.log('Match ID:', this.idMatch); // Log the match ID for debugging
    this.token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    console.log('Token:', this.token); // Log the token for debugging
    this.loadStudentProfile(); // Load the student profile when the component initializes
  }

  loadStudentProfile(): void {
    const sub = this.matchService.getStudentProfile(this.token, this.idStudent).subscribe({
      next: (response) => {
        if (response.success) {
          this.studentProfileData = response.data; // Store the student profile data
          this.updateVisibleInterests();
          console.log('Student profile loaded:', this.studentProfileData); // Log the student profile data for debugging
        } else {
          console.error('Error loading student profile:', response.message); // Log error message for debugging
        }
      },
      error: (error) => {
        console.error('Error de server:', error); // Log error message for debugging
      }
    });
    this.subscriptions.push(sub); // Add the subscription to the array for cleanup
  }

  visibleInterests: string[] = [];
  showAllInterests = false;



  toggleInterests() {
    this.showAllInterests = !this.showAllInterests;
    this.updateVisibleInterests();
  }

  updateVisibleInterests() {
    const all = this.studentProfileData?.interests || [];
    this.visibleInterests = this.showAllInterests ? all : all.slice(0, 5);
  }


}
