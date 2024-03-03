import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveCalendarComponent } from './view-leave-calendar.component';

describe('ViewLeaveCalendarComponent', () => {
  let component: ViewLeaveCalendarComponent;
  let fixture: ComponentFixture<ViewLeaveCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
