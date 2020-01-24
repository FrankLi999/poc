import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengCheckboxComponent } from './dynamic-ui-primeng-checkbox.component';

describe('DynamicUIPrimengCheckboxComponent', () => {
  let component: DynamicUIPrimengCheckboxComponent;
  let fixture: ComponentFixture<DynamicUIPrimengCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
