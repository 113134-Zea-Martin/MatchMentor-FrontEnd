import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedMatchsComponent } from './confirmed-matchs.component';

describe('ConfirmedMatchsComponent', () => {
  let component: ConfirmedMatchsComponent;
  let fixture: ComponentFixture<ConfirmedMatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedMatchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
