import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialRadioGroupComponent } from './formio-material-radio-group.component';

describe('FormioMaterialRadioGroupComponent', () => {
  let component: FormioMaterialRadioGroupComponent;
  let fixture: ComponentFixture<FormioMaterialRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
