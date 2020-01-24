import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengRadioGroupComponent } from './dynamic-ui-primeng-radio-group.component';

describe('DynamicUIPrimengRadioGroupComponent', () => {
  let component: DynamicUIPrimengRadioGroupComponent;
  let fixture: ComponentFixture<DynamicUIPrimengRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
