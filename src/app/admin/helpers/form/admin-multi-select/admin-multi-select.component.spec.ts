import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMultiSelectComponent } from './admin-multi-select.component';

describe('AdminMultiSelectComponent', () => {
  let component: AdminMultiSelectComponent;
  let fixture: ComponentFixture<AdminMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
