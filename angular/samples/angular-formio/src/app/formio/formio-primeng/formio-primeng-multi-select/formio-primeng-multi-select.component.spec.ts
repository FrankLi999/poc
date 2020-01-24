import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengMultiSelectComponent } from './formio-primeng-multi-select.component';

describe('FormioPrimengMultiSelectComponent', () => {
  let component: FormioPrimengMultiSelectComponent;
  let fixture: ComponentFixture<FormioPrimengMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
