import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialSlideToggleComponent } from './dynamic-ui-material-slide-toggle.component';

describe('DynamicUIMaterialSlideToggleComponent', () => {
  let component: DynamicUIMaterialSlideToggleComponent;
  let fixture: ComponentFixture<DynamicUIMaterialSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
