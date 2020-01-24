import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicControlComponent } from './dynamic-ui-basic-control.component';

describe('DynamicUIBasicControlComponent', () => {
  let component: DynamicUIBasicControlComponent;
  let fixture: ComponentFixture<DynamicUIBasicControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
