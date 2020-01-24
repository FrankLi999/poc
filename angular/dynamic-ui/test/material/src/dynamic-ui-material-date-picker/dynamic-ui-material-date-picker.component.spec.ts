import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialDatePickerComponent } from './dynamic-ui-material-date-picker.component';

describe('DynamicUIMaterialDatePickerComponent', () => {
  let component: DynamicUIMaterialDatePickerComponent;
  let fixture: ComponentFixture<DynamicUIMaterialDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
