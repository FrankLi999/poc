import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicFieldsetComponent } from './formio-basic-fieldset.component';

describe('FormioFieldsetBasicComponent', () => {
  let component: FormioBasicFieldsetComponent;
  let fixture: ComponentFixture<FormioBasicFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
