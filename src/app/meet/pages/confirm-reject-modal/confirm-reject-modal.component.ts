import { Component, EventEmitter, Output } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-reject-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-reject-modal.component.html',
  styleUrl: './confirm-reject-modal.component.css'
})
export class ConfirmRejectModalComponent {
  private modal: any;
  meetingId: number | null = null;

  @Output() onConfirm = new EventEmitter<number>();

  open(meetingId: number) {
    this.meetingId = meetingId;
    const modalElement = document.getElementById('confirmRejectModal');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  confirm() {
    if (this.meetingId !== null) {
      this.onConfirm.emit(this.meetingId);
      this.modal.hide();
    }
  }
}