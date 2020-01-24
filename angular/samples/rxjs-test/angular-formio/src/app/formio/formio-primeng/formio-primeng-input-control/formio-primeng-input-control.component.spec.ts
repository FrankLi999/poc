import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengInputControlComponent } from './formio-primeng-input-control.component';

describe('FormioPrimengInputControlComponent', () => {
  let component: FormioPrimengInputControlComponent;
  let fixture: ComponentFixture<FormioPrimengInputControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengInputControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
