import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAcceptModalComponent } from './confirm-accept-modal.component';

describe('ConfirmAcceptModalComponent', () => {
  let component: ConfirmAcceptModalComponent;
  let fixture: ComponentFixture<ConfirmAcceptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAcceptModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAcceptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
