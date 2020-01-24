import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicRadioGroupComponent } from './dynamic-ui-basic-radio-group.component';

describe('DynamicUIRadioGroupBasicComponent', () => {
  let component: DynamicUIBasicRadioGroupComponent;
  let fixture: ComponentFixture<DynamicUIBasicRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
