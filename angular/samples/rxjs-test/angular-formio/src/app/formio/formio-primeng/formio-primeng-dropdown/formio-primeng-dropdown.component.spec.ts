import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengDropdownComponent } from './formio-primeng-dropdown.component';

describe('FormioPrimengDropdownComponent', () => {
  let component: FormioPrimengDropdownComponent;
  let fixture: ComponentFixture<FormioPrimengDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
