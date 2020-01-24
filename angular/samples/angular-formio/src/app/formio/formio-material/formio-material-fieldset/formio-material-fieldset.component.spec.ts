import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialFieldsetComponent } from './formio-material-fieldset.component';

describe('FormioMaterialFieldsetComponent', () => {
  let component: FormioMaterialFieldsetComponent;
  let fixture: ComponentFixture<FormioMaterialFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
