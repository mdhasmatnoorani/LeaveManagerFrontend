import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaveDetailsComponent } from './my-leave-details.component';

describe('MyLeaveDetailsComponent', () => {
  let component: MyLeaveDetailsComponent;
  let fixture: ComponentFixture<MyLeaveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLeaveDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
