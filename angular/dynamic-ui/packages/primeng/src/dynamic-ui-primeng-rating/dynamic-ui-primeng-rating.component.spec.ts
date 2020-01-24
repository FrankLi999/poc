import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengRatingComponent } from './dynamic-ui-primeng-rating.component';

describe('DynamicUIPrimengRatingComponent', () => {
  let component: DynamicUIPrimengRatingComponent;
  let fixture: ComponentFixture<DynamicUIPrimengRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
