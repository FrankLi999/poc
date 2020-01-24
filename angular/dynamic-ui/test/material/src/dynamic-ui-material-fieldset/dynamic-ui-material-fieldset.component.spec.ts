import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIMaterialFieldsetComponent } from './dynamic-ui-material-fieldset.component';

describe('DynamicUIMaterialFieldsetComponent', () => {
  let component: DynamicUIMaterialFieldsetComponent;
  let fixture: ComponentFixture<DynamicUIMaterialFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIMaterialFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIMaterialFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
