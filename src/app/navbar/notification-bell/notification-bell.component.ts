import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../auth/services/auth.service';
import { NotificationResponseDatum } from '../notification-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent implements OnInit, OnDestroy, AfterViewInit {


  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('idProfile'));
    this.token = localStorage.getItem('token') || ''; // Get the token from local storage or set it to an empty string if not found
    this.loadLatestNotifications();
  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    // for (let i = 0; i < this.notifications.length; i++) {
    //   this.markAsRead(this.notifications[i].id);
    // }
    this.notifications = [];
    this.unreadNotifications = [];
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  constructor(private notificationService: NotificationService) { }

  ngAfterViewInit(): void {
  }

  notifications: NotificationResponseDatum[] = [];
  unreadNotifications: NotificationResponseDatum[] = [];
  userId: number = 0;
  token: string = '';

  loadLatestNotifications() {
    const sus = this.notificationService.getlast10Notifications(this.userId, this.token).subscribe({
      next: (response) => {
        this.notifications = response.data;
        // Crea una copia profunda para evitar referencias compartidas
        this.unreadNotifications = [...this.notifications];
        this.markAllAsRead();
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
    this.subscriptions.push(sus);
  }


  markAsRead(notificationId: number) {
    const sus = this.notificationService.markAsRead(notificationId, this.token).subscribe({
      next: (response) => {
        console.log('Notification marked as read:', response);
        // this.loadLatestNotifications(); // Reload notifications after marking one as read
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
    this.subscriptions.push(sus);
  }

  markAllAsRead() {
    const unread = this.notifications.filter(n => !n.isRead);
    unread.forEach(n => this.markAsRead(n.id));
  }

}