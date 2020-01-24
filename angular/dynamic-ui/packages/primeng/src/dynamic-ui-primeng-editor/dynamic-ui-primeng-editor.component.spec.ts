import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUIPrimengEditorComponent } from './dynamic-ui-primeng-editor.component';

describe('DynamicUIPrimengEditorComponent', () => {
  let component: DynamicUIPrimengEditorComponent;
  let fixture: ComponentFixture<DynamicUIPrimengEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUIPrimengEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUIPrimengEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
