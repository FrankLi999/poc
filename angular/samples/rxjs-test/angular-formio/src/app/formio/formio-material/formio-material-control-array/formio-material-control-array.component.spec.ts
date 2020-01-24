import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialControlArrayComponent } from './formio-material-control-array.component';

describe('FormioMaterialControlArrayComponent', () => {
  let component: FormioMaterialControlArrayComponent;
  let fixture: ComponentFixture<FormioMaterialControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
