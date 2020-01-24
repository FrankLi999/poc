import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicControlArrayComponent } from './formio-basic-control-array.component';

describe('FormioControlArrayBasicComponent', () => {
  let component: FormioBasicControlArrayComponent;
  let fixture: ComponentFixture<FormioBasicControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
