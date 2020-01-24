import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengCalendarComponent } from './dynamic-ui-primeng-calendar.component';

describe('DynamicUIPrimengCalendarComponent', () => {
  let component: DynamicUIPrimengCalendarComponent;
  let fixture: ComponentFixture<DynamicUIPrimengCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
