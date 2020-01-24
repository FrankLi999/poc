import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialInputComponent } from './formio-material-input.component';

describe('FormioMaterialInputComponent', () => {
  let component: FormioMaterialInputComponent;
  let fixture: ComponentFixture<FormioMaterialInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
