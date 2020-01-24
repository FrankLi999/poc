import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicControlArrayComponent } from './dynamic-ui-basic-control-array.component';

describe('DynamicUIControlArrayBasicComponent', () => {
  let component: DynamicUIBasicControlArrayComponent;
  let fixture: ComponentFixture<DynamicUIBasicControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
