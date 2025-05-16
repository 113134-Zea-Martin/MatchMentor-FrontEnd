import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-accept-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-accept-modal.component.html',
  styleUrl: './confirm-accept-modal.component.css'
})
export class ConfirmAcceptModalComponent {
  private modal: any;
  meeting: any = null;

  @Output() onConfirm = new EventEmitter<number>();

  open(meeting: any) {
    this.meeting = meeting;
    const modalElement = document.getElementById('confirmAcceptModal');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  confirm() {
    if (this.meeting?.id) {
      this.onConfirm.emit(this.meeting.id);
      this.modal.hide();
    }
  }
}