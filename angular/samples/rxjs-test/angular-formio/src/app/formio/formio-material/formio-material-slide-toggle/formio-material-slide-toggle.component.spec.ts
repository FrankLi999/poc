import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioMaterialSlideToggleComponent } from './formio-material-slide-toggle.component';

describe('FormioMaterialSlideToggleComponent', () => {
  let component: FormioMaterialSlideToggleComponent;
  let fixture: ComponentFixture<FormioMaterialSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioMaterialSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioMaterialSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
