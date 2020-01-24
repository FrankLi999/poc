import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicCheckboxComponent } from './dynamic-ui-basic-checkbox.component';

describe('FDynamicUICheckboxBasicComponent', () => {
  let component: DynamicUIBasicCheckboxComponent;
  let fixture: ComponentFixture<DynamicUIBasicCheckboxComponent>;

  beforeEach(async(() => {DynamicUIBasicCheckboxComponent
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
