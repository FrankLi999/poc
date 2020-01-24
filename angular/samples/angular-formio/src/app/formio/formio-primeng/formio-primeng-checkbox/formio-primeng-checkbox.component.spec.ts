import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengCheckboxComponent } from './formio-primeng-checkbox.component';

describe('FormioPrimengCheckboxComponent', () => {
  let component: FormioPrimengCheckboxComponent;
  let fixture: ComponentFixture<FormioPrimengCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
