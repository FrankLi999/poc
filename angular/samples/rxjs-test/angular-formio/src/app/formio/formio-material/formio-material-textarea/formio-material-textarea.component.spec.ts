import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialTextareaComponent } from './formio-material-textarea.component';

describe('FormioMaterialTextareaComponent', () => {
  let component: FormioMaterialTextareaComponent;
  let fixture: ComponentFixture<FormioMaterialTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
