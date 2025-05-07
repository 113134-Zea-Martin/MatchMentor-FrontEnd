import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatMessage } from '../../models/chat-message';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../services/meeting.service';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';
import { CreateMeetingRequestDto } from '../../models/create-meeting-request-dto';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MeetingModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  token?: string;
  matchId!: number;
  senderId = 1;
  receiverId!: number;

  messages: ChatMessage[] = [];
  allMessages: ChatMessage[] = [];
  newMessage = '';
  matchName!: string;
  // Mensaje de advertencia para que no envíen datos sensibles o personales en el chat
  // Agrega estas propiedades en tu clase
  warningMessage = 'Por favor, no compartas información personal sensible (como datos bancarios, documentos de identidad, contraseñas, etc.) a través de este chat.';
  warningMessageVisible = true;

  // Agrega este método para cerrar el mensaje
  closeWarning(): void {
    this.warningMessageVisible = false;
  }

  onScheduleMeeting(data: CreateMeetingRequestDto): void {
    this.meetingService.createMeeting(this.token || '', data).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Reunión agendada con éxito');
        } else {
          alert('Error al agendar reunión: ' + response.message);
        }
      },
      error: () => alert('Error al agendar reunión')
    });
  }
  

  showingFullHistory = false;
  shouldScrollToBottom = true;

  private subscription!: Subscription;
  susbs: Subscription[] = [];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('scrollMarker') private scrollMarker!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private meetingService: MeetingService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.senderId = Number(localStorage.getItem('idProfile')) || 0;
    this.receiverId = Number(localStorage.getItem('receiverId')) || 0;
    this.matchId = Number(localStorage.getItem('idMatch')) || 0;
    this.matchName = localStorage.getItem('matchName') || '';
    this.chatService.connect(this.matchId);

    const sus = this.chatService.getHistory(this.matchId, this.token).subscribe(history => {
      this.allMessages = history.map(msg => {
        const ts = msg.timestamp;
        if (Array.isArray(ts)) {
          msg.timestamp = new Date(
            ts[0],
            ts[1] - 1,
            ts[2],
            ts[3],
            ts[4],
            ts[5],
            Math.floor(ts[6] / 1000000)
          );
        }
        return msg;
      });

      this.messages = this.allMessages.slice(-15);
      this.shouldScrollToBottom = true;
      this.scrollToBottomImmediate();
    });

    this.susbs.push(sus);

    this.subscription = this.chatService.message$.subscribe(msg => {
      if (msg) {
        this.allMessages.push(msg);
        if (!this.showingFullHistory) {
          // Mantener solo los últimos 15 mensajes si no se muestra el historial completo
          if (this.messages.length >= 15) {
            this.messages.shift();
          }
        }
        this.messages.push(msg);


        // Si el chat está activo, marco como leído
        this.chatService.markAsRead(this.matchId, this.receiverId, this.token || '').subscribe(() => {
          console.log('Mensajes marcados como leídos');
        });

        this.shouldScrollToBottom = true;
        this.scrollToBottomImmediate();
      }
    });
    const markAsRead = this.chatService.markAsRead(this.matchId, this.receiverId, this.token).subscribe(() => {
      console.log('Mensajes marcados como leídos');
    }
    );
    this.susbs.push(markAsRead);
  }

  send(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.matchId, this.senderId, this.newMessage);
      this.newMessage = '';
      this.shouldScrollToBottom = true;
      this.scrollToBottomImmediate();
    }
  }

  loadAllHistory(): void {
    this.messages = [...this.allMessages];
    this.showingFullHistory = true;
    this.shouldScrollToBottom = true;
    // this.scrollToBottomImmediate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.susbs.forEach(s => s.unsubscribe());
    this.chatService.disconnect();
  }

  ngAfterViewInit() {
    this.scrollToBottomImmediate();
  }

  scrollToBottomImmediate(): void {
    setTimeout(() => {
      if (this.shouldScrollToBottom && this.scrollMarker) {
        this.scrollMarker.nativeElement.scrollIntoView({ behavior: 'auto' });
        this.shouldScrollToBottom = false;
      }
    }, 100);
  }
}