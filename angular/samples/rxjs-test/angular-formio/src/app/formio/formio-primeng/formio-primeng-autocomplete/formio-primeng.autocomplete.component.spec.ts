import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengAutocompleteComponent } from './formio-primeng.autocomplete.component';

describe('FormioPrimengAutocompleteComponent', () => {
  let component: FormioPrimengAutocompleteComponent;
  let fixture: ComponentFixture<FormioPrimengAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
