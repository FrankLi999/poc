import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialDatePickerComponent } from './formio-material-date-picker.component';

describe('FormioMaterialDatePickerComponent', () => {
  let component: FormioMaterialDatePickerComponent;
  let fixture: ComponentFixture<FormioMaterialDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
