import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengRatingComponent } from './formio-primeng-rating.component';

describe('FormioPrimengRatingComponent', () => {
  let component: FormioPrimengRatingComponent;
  let fixture: ComponentFixture<FormioPrimengRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
