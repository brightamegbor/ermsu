import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficerecordsComponent } from './edit-officerecords.component';

describe('EditOfficerecordsComponent', () => {
  let component: EditOfficerecordsComponent;
  let fixture: ComponentFixture<EditOfficerecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfficerecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfficerecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
