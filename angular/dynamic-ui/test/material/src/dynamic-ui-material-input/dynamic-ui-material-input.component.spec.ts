import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialInputComponent } from './dynamic-ui-material-input.component';

describe('DynamicMaterialInputComponent', () => {
  let component: DynamicUIMaterialInputComponent;
  let fixture: ComponentFixture<DynamicUIMaterialInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
