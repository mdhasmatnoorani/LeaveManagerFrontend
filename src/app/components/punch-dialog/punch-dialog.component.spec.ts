import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchDialogComponent } from './punch-dialog.component';

describe('PunchDialogComponent', () => {
  let component: PunchDialogComponent;
  let fixture: ComponentFixture<PunchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
