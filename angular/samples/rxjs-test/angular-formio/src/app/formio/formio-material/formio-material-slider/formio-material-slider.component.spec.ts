import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialSliderComponent } from './formio-material-slider.component';

describe('FormioMaterialSliderComponent', () => {
  let component: FormioMaterialSliderComponent;
  let fixture: ComponentFixture<FormioMaterialSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
