import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicControlComponent } from './formio-basic-control.component';

describe('FormioBasicControlComponent', () => {
  let component: FormioBasicControlComponent;
  let fixture: ComponentFixture<FormioBasicControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
