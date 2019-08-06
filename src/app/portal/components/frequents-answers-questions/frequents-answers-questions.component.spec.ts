import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentsAnswersQuestionsComponent } from './frequents-answers-questions.component';

describe('FrequentsAnswersQuestionsComponent', () => {
  let component: FrequentsAnswersQuestionsComponent;
  let fixture: ComponentFixture<FrequentsAnswersQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentsAnswersQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentsAnswersQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
