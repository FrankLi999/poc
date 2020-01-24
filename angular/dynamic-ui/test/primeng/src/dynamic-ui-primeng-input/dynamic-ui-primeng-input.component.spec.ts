import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengInputComponent } from './dynamic-ui-primeng-input.component';

describe('DynamicUIPrimengInputComponent', () => {
  let component: DynamicUIPrimengInputComponent;
  let fixture: ComponentFixture<DynamicUIPrimengInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
