import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Subscription } from 'rxjs';
import { ConfirmedMatchResponseDto } from '../../models/confirmed-match-response-dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmed-matchs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmed-matchs.component.html',
  styleUrl: './confirmed-matchs.component.css'
})
export class ConfirmedMatchsComponent implements OnInit, OnDestroy {

  startChat(arg0: number, matchName: string, receiverId: number, matchRole: string) {
    // Store the selected match ID in local storage
    localStorage.setItem('idMatch', arg0.toString());
    localStorage.setItem('matchName', matchName);
    localStorage.setItem('receiverId', receiverId.toString());
    localStorage.setItem('matchRole', matchRole);
    // Navigate to the chat page with the selected match ID
    this.router.navigate(['/chat']);
  }

  subscriptions: Subscription[] = [];
  confirmedMatchs: ConfirmedMatchResponseDto[] = [];
  idUser: number = 0;
  token: string = '';


  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit(): void {
    // Get the user ID and token from local storage
    this.idUser = Number(localStorage.getItem('idProfile'));
    this.token = localStorage.getItem('token') || '';

    // Fetch confirmed matches for the user
    this.loadConfirmedMatches();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadConfirmedMatches() {
    this.subscriptions.push(
      this.matchService.getConfirmedMatches(this.token, this.idUser).subscribe({
        next: (response: ConfirmedMatchResponseDto[]) => {
          this.confirmedMatchs = response;
          console.log('Confirmed matches:', this.confirmedMatchs);
        },
        error: (error) => {
          console.error('Error fetching confirmed matches:', error);
        }
      })
    );
  }

}
