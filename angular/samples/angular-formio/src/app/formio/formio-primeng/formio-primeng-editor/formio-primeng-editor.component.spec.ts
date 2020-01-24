import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioPrimengEditorComponent } from './formio-primeng-editor.component';

describe('FormioPrimengEditorComponent', () => {
  let component: FormioPrimengEditorComponent;
  let fixture: ComponentFixture<FormioPrimengEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioPrimengEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioPrimengEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
