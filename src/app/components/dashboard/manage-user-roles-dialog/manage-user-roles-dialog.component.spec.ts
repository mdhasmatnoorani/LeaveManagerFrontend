import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserRolesDialogComponent } from './manage-user-roles-dialog.component';

describe('ManageUserRolesDialogComponent', () => {
  let component: ManageUserRolesDialogComponent;
  let fixture: ComponentFixture<ManageUserRolesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserRolesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
