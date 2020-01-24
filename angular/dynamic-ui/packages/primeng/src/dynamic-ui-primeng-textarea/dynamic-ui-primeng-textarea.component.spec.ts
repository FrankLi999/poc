import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengTextareaComponent } from './dynamic-ui-primeng-textarea.component';

describe('DynamicUIPrimengTextareaComponent', () => {
  let component: DynamicUIPrimengTextareaComponent;
  let fixture: ComponentFixture<DynamicUIPrimengTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
