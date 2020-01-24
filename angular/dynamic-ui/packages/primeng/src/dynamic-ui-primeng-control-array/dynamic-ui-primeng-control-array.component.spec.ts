import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengControlArrayComponent } from './dynamic-ui-primeng-control-array.component';

describe('DynamicUIPrimengControlArrayComponent', () => {
  let component: DynamicUIPrimengControlArrayComponent;
  let fixture: ComponentFixture<DynamicUIPrimengControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
