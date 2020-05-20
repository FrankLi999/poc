import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryUploadComponent } from './binary-upload.component';

describe('BinaryUploadComponent', () => {
  let component: BinaryUploadComponent;
  let fixture: ComponentFixture<BinaryUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaryUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
