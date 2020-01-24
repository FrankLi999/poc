import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicInputComponent } from './dynamic-ui-basic-input.component';

describe('DynamicUIInputBasicComponent', () => {
  let component: DynamicUIBasicInputComponent;
  let fixture: ComponentFixture<DynamicUIBasicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
