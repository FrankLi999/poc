import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialRadioGroupComponent } from './dynamic-ui-material-radio-group.component';

describe('DynamicUIMaterialRadioGroupComponent', () => {
  let component: DynamicUIMaterialRadioGroupComponent;
  let fixture: ComponentFixture<DynamicUIMaterialRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
