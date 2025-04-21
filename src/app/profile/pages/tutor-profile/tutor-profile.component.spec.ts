import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileComponent } from './tutor-profile.component';

describe('TutorProfileComponent', () => {
  let component: TutorProfileComponent;
  let fixture: ComponentFixture<TutorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
