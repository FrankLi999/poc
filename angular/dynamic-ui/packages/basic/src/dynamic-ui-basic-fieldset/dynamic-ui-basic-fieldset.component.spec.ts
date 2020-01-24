import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicFieldsetComponent } from './dynamic-ui-basic-fieldset.component';

describe('DynamicUIFieldsetBasicComponent', () => {
  let component: DynamicUIBasicFieldsetComponent;
  let fixture: ComponentFixture<DynamicUIBasicFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
