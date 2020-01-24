import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengFieldsetComponent } from './dynamic-ui-primeng-fieldset.component';

describe('DynamicUIPrimengFieldsetComponent', () => {
  let component: DynamicUIPrimengFieldsetComponent;
  let fixture: ComponentFixture<DynamicUIPrimengFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
