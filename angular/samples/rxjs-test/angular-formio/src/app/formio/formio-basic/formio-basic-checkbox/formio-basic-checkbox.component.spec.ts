import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicCheckboxComponent } from './formio-basic-checkbox.component';

describe('FormioCheckboxBasicComponent', () => {
  let component: FormioBasicCheckboxComponent;
  let fixture: ComponentFixture<FormioBasicCheckboxComponent>;

  beforeEach(async(() => {FormioBasicCheckboxComponent
    TestBed.configureTestingModule({
      declarations: [ FormioBasicCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
