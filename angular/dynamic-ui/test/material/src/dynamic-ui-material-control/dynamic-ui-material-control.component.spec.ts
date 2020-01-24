import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialControlComponent } from './dynamic-ui-material-control.component';

describe('DynamicUIMaterialControlComponent', () => {
  let component: DynamicUIMaterialControlComponent;
  let fixture: ComponentFixture<DynamicUIMaterialControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
