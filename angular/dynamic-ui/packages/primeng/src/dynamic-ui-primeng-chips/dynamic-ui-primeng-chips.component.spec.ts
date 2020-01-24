import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengChipsComponent } from './dynamic-ui-primeng-chips.component';

describe('DynamicUIPrimengChipsComponent', () => {
  let component: DynamicUIPrimengChipsComponent;
  let fixture: ComponentFixture<DynamicUIPrimengChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
