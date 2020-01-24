import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengSliderComponent } from './dynamic-ui-primeng-slider.component';

describe('DynamicUIPrimengSliderComponent', () => {
  let component: DynamicUIPrimengSliderComponent;
  let fixture: ComponentFixture<DynamicUIPrimengSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
