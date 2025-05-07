import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateMeetingRequestDto } from '../../models/create-meeting-request-dto';
import { formatDate } from '@angular/common';


declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
  selector: 'app-meeting-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './meeting-modal.component.html',
  styleUrl: './meeting-modal.component.css'
})
export class MeetingModalComponent {

  @Input() studentId!: number;
  @Input() mentorId!: number;
  @Input() matchId!: number;

  @Output() schedule = new EventEmitter<any>();

  createMeetingRequest!: CreateMeetingRequestDto;

  meetingForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    duration: new FormControl(1, [Validators.required, Validators.min(1)]),
    reason: new FormControl("", [Validators.required, Validators.maxLength(200)]),
  });

  constructor() { }

  ngOnInit() {
    this.createMeetingRequest = {
      studentId: this.studentId,
      mentorId: this.mentorId,
      matchId: this.matchId,
      date: new Date().toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: 1,
      reason: ""
    };
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      // Formatear la fecha como YYYY-MM-DD
      const rawDate: Date = this.meetingForm.value.date;
      const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en-US');
  
      // Formatear la hora en formato HH:mm (24 horas)
      const rawTime: string = this.meetingForm.value.time;
      const timeDate = new Date(`1970-01-01T${rawTime}`);
      const formattedTime = timeDate.toTimeString().slice(0, 5); // "HH:mm"
  
      this.createMeetingRequest = {
        studentId: this.studentId,
        mentorId: this.mentorId,
        matchId: this.matchId,
        date: formattedDate,
        time: formattedTime,
        duration: this.meetingForm.value.duration,
        reason: this.meetingForm.value.reason
      };
  
      this.schedule.emit(this.createMeetingRequest);
      const modal = bootstrap.Modal.getInstance(document.getElementById('scheduleModal')!);
      modal?.hide();
    } else {
      console.log("Formulario inválido");
      console.log(this.meetingForm.value);
    }
  }

}
