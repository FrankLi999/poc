import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengControlArrayComponent } from './formio-primeng-control-array.component';

describe('FormioPrimengControlArrayComponent', () => {
  let component: FormioPrimengControlArrayComponent;
  let fixture: ComponentFixture<FormioPrimengControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
