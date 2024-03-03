import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveCalendarDetailsComponent } from './add-leave-calendar-details.component';

describe('AddLeaveCalendarDetailsComponent', () => {
  let component: AddLeaveCalendarDetailsComponent;
  let fixture: ComponentFixture<AddLeaveCalendarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveCalendarDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveCalendarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
