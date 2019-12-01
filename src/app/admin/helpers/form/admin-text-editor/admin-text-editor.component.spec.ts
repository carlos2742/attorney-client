import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextEditorComponent } from './admin-text-editor.component';

describe('AdminTextEditorComponent', () => {
  let component: AdminTextEditorComponent;
  let fixture: ComponentFixture<AdminTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
