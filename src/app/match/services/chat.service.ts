import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient!: Client;
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  message$ = this.messageSubject.asObservable();
  private readonly baseUrl = 'http://localhost:8080/ws'; // Cambia esto a la URL de tu servidor WebSocket
  private readonly apiUrl = environment.apiUrl + '/chat'; // Cambia esto a la URL de tu API REST

  constructor(private http: HttpClient) { }

  connect(matchId: number): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.baseUrl), // asegurate de que la URL coincida
      reconnectDelay: 5000,
      onConnect: () => {
        this.stompClient.subscribe(`/topic/chat.${matchId}`, (message: IMessage) => {
          // const body = JSON.parse(message.body);
          // this.messageSubject.next(body);
          const body = JSON.parse(message.body);
          body.timestamp = new Date(
            body.timestamp[0],        // año
            body.timestamp[1] - 1,    // mes (ojo: en JS los meses van de 0 a 11)
            body.timestamp[2],        // día
            body.timestamp[3],        // hora
            body.timestamp[4],        // minuto
            body.timestamp[5],        // segundo
            Math.floor(body.timestamp[6] / 1000000) // nanosegundos a milisegundos
          );
          this.messageSubject.next(body);

        });
      }
    });

    this.stompClient.activate();
  }

  sendMessage(matchId: number, senderId: number, content: string): void {
    const msg: ChatMessage = {
      matchId,
      senderId,
      content,
      timestamp: new Date()
    };

    this.stompClient.publish({
      destination: `/app/chat.${matchId}`,
      body: JSON.stringify(msg)
    });
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  getHistory(matchId: number, token: String): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://localhost:8080/api/chat/${matchId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  markAsRead(matchId: number, userId: number, token: String): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/${matchId}/read/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}