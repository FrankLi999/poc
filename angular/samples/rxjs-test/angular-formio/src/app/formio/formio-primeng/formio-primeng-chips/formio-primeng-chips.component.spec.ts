import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengChipsComponent } from './formio-primeng-chips.component';

describe('FormioPrimengChipsComponent', () => {
  let component: FormioPrimengChipsComponent;
  let fixture: ComponentFixture<FormioPrimengChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
