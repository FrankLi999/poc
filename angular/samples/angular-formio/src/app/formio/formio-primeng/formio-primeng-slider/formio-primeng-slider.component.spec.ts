import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengSliderComponent } from './formio-primeng-slider.component';

describe('FormioPrimengSliderComponent', () => {
  let component: FormioPrimengSliderComponent;
  let fixture: ComponentFixture<FormioPrimengSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
