import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengInputSwitchComponent } from './formio-primeng-input-switch.component';

describe('FormioPrimengInputSwitchComponent', () => {
  let component: FormioPrimengInputSwitchComponent;
  let fixture: ComponentFixture<FormioPrimengInputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengInputSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
