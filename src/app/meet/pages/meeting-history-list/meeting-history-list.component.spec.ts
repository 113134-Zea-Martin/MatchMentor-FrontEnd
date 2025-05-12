import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHistoryListComponent } from './meeting-history-list.component';

describe('MeetingHistoryListComponent', () => {
  let component: MeetingHistoryListComponent;
  let fixture: ComponentFixture<MeetingHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHistoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
