import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialCheckboxComponent } from './dynamic-ui-material-checkbox.component';

describe('DynamicUIMaterialCheckboxComponent', () => {
  let component: DynamicUIMaterialCheckboxComponent;
  let fixture: ComponentFixture<DynamicUIMaterialCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
