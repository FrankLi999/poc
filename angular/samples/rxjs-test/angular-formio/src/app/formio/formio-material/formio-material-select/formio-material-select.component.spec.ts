import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialSelectComponent } from './formio-material-select.component';

describe('FormioMaterialSelectComponent', () => {
  let component: FormioMaterialSelectComponent;
  let fixture: ComponentFixture<FormioMaterialSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
