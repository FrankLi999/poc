import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengControlComponent } from './formio-primeng-control.component';

describe('FormioPrimengControlComponent', () => {
  let component: FormioPrimengControlComponent;
  let fixture: ComponentFixture<FormioPrimengControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
