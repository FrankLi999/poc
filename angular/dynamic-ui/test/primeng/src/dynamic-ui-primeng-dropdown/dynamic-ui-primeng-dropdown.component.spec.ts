import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengDropdownComponent } from './dynamic-ui-primeng-dropdown.component';

describe('DynamicUIPrimengDropdownComponent', () => {
  let component: DynamicUIPrimengDropdownComponent;
  let fixture: ComponentFixture<DynamicUIPrimengDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
