import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRejectModalComponent } from './confirm-reject-modal.component';

describe('ConfirmRejectModalComponent', () => {
  let component: ConfirmRejectModalComponent;
  let fixture: ComponentFixture<ConfirmRejectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRejectModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRejectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
