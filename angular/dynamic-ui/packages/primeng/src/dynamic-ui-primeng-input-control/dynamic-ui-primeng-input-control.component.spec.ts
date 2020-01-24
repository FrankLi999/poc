import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengInputControlComponent } from './dynamic-ui-primeng-input-control.component';

describe('DynamicUIPrimengInputControlComponent', () => {
  let component: DynamicUIPrimengInputControlComponent;
  let fixture: ComponentFixture<DynamicUIPrimengInputControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengInputControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
