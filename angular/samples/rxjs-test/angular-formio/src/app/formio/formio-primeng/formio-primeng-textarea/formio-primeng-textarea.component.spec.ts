import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengTextareaComponent } from './formio-primeng-textarea.component';

describe('FormioPrimengTextareaComponent', () => {
  let component: FormioPrimengTextareaComponent;
  let fixture: ComponentFixture<FormioPrimengTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
