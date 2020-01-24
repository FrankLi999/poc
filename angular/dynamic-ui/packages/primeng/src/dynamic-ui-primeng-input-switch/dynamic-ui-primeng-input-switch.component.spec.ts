import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengInputSwitchComponent } from './dynamic-ui-primeng-input-switch.component';

describe('DynamicUIPrimengInputSwitchComponent', () => {
  let component: DynamicUIPrimengInputSwitchComponent;
  let fixture: ComponentFixture<DynamicUIPrimengInputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengInputSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
