import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageUploadComponent } from './admin-image-upload.component';

describe('AdminImageUploadComponent', () => {
  let component: AdminImageUploadComponent;
  let fixture: ComponentFixture<AdminImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
