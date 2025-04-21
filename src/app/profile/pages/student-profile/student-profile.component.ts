import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Data, UserResponseDTO } from '../../models/user-response-dto';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit, OnDestroy{
  @Input() idStudent: number = 0; // Input property to receive the student ID from the parent component

  constructor(private userService: UserService) { } // Constructor for the component

  userProfile?: UserResponseDTO; // Property to hold the user profile data
  studentProfileData?: Data;

  subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  ngOnInit(): void {
    // Load the student profile when the component initializes
    this.loadStudentProfile();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
     this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadStudentProfile(): void {
    const token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    const sub = this.userService.getUserById(this.idStudent).subscribe({
      next: (response: UserResponseDTO) => {
        if (response.success) {
          this.userProfile = response; // Assign the user profile data to the component property
          this.studentProfileData = response.data; // Assign the user profile data to the component property
          console.log('Student profile loaded:', this.studentProfileData);
        } else {
          console.error('Error loading student profile:', response.message);
        }
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
      }
    });
    // this.subscriptions.push(sub); // Add the subscription to the array for cleanup
  }

}
