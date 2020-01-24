import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialCheckboxComponent } from './formio-material-checkbox.component';

describe('FormioMaterialCheckboxComponent', () => {
  let component: FormioMaterialCheckboxComponent;
  let fixture: ComponentFixture<FormioMaterialCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
