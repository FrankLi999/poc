import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengInputComponent } from './formio-primeng-input.component';

describe('FormioPrimengInputComponent', () => {
  let component: FormioPrimengInputComponent;
  let fixture: ComponentFixture<FormioPrimengInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
