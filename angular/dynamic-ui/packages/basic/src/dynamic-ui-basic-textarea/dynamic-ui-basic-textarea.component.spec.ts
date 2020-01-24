import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  DynamicUIBasicTextareaComponent } from './dynamic-ui-basic-textarea.component';

describe('DynamicUIBasicTextareaComponent', () => {
  let component: DynamicUIBasicTextareaComponent;
  let fixture: ComponentFixture<DynamicUIBasicTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
