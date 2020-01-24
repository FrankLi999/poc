import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengAutocompleteComponent } from './dynamic-ui-primeng.autocomplete.component';

describe('DynamicUIPrimengAutocompleteComponent', () => {
  let component: DynamicUIPrimengAutocompleteComponent;
  let fixture: ComponentFixture<DynamicUIPrimengAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
