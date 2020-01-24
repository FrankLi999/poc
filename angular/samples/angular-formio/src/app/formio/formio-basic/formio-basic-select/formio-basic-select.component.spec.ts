import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicSelectComponent } from './formio-basic-select.component';

describe('FormioBasicSelectComponent', () => {
  let component: FormioBasicSelectComponent;
  let fixture: ComponentFixture<FormioBasicSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
