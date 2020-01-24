import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengCalendarComponent } from './formio-primeng-calendar.component';

describe('FormioPrimengCalendarComponent', () => {
  let component: FormioPrimengCalendarComponent;
  let fixture: ComponentFixture<FormioPrimengCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
