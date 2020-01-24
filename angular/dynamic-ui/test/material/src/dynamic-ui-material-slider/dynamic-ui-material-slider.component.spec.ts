import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialSliderComponent } from './dynamic-ui-material-slider.component';

describe('DynamicUIMaterialSliderComponent', () => {
  let component: DynamicUIMaterialSliderComponent;
  let fixture: ComponentFixture<DynamicUIMaterialSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
