import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  DynamicUIPrimengMultiSelectComponent } from './dynamic-ui-primeng-multi-select.component';

describe('DynamicUIPrimengMultiSelectComponent', () => {
  let component: DynamicUIPrimengMultiSelectComponent;
  let fixture: ComponentFixture<DynamicUIPrimengMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
