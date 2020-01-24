import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengControlComponent } from './dynamic-ui-primeng-control.component';

describe('DynamicUIPrimengControlComponent', () => {
  let component: DynamicUIPrimengControlComponent;
  let fixture: ComponentFixture<DynamicUIPrimengControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
