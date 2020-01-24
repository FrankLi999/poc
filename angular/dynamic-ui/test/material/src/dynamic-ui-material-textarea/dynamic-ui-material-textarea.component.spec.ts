import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialTextareaComponent } from './dynamic-ui-material-textarea.component';

describe('DynamicUIMaterialTextareaComponent', () => {
  let component: DynamicUIMaterialTextareaComponent;
  let fixture: ComponentFixture<DynamicUIMaterialTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
