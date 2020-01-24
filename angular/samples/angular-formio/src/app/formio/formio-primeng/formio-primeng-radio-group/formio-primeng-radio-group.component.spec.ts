import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengRadioGroupComponent } from './formio-primeng-radio-group.component';

describe('FormioPrimengRadioGroupComponent', () => {
  let component: FormioPrimengRadioGroupComponent;
  let fixture: ComponentFixture<FormioPrimengRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
