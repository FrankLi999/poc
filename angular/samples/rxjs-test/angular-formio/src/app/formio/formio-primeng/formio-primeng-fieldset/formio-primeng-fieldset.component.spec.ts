import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengFieldsetComponent } from './formio-primeng-fieldset.component';

describe('FormioPrimengFieldsetComponent', () => {
  let component: FormioPrimengFieldsetComponent;
  let fixture: ComponentFixture<FormioPrimengFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
