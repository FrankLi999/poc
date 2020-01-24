import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialControlComponent } from './formio-material-control.component';

describe('FormioMaterialControlComponent', () => {
  let component: FormioMaterialControlComponent;
  let fixture: ComponentFixture<FormioMaterialControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
