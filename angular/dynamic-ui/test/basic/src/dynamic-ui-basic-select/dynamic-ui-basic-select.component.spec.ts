import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIBasicSelectComponent } from './dynamic-ui-basic-select.component';

describe('DynamicUIBasicSelectComponent', () => {
  let component: DynamicUIBasicSelectComponent;
  let fixture: ComponentFixture<DynamicUIBasicSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIBasicSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIBasicSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
