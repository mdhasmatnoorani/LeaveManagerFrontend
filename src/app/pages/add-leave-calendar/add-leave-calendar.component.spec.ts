import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveCalendarComponent } from './add-leave-calendar.component';

describe('AddLeaveCalendarComponent', () => {
  let component: AddLeaveCalendarComponent;
  let fixture: ComponentFixture<AddLeaveCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
