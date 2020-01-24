import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialControlArrayComponent } from './dynamic-ui-material-control-array.component';

describe('DynamicUIMaterialControlArrayComponent', () => {
  let component: DynamicUIMaterialControlArrayComponent;
  let fixture: ComponentFixture<DynamicUIMaterialControlArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialControlArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialControlArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
