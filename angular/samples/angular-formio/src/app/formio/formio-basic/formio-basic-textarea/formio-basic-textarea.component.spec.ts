import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicTextareaComponent } from './formio-basic-textarea.component';

describe('FormioBasicTextareaComponent', () => {
  let component: FormioBasicTextareaComponent;
  let fixture: ComponentFixture<FormioBasicTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
