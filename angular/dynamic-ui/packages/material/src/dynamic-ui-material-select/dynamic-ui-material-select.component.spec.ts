import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialSelectComponent } from './dynamic-ui-material-select.component';

describe('DynamicUIMaterialSelectComponent', () => {
  let component: DynamicUIMaterialSelectComponent;
  let fixture: ComponentFixture<DynamicUIMaterialSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
