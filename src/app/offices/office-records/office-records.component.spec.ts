import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeRecordsComponent } from './office-records.component';

describe('OfficeRecordsComponent', () => {
  let component: OfficeRecordsComponent;
  let fixture: ComponentFixture<OfficeRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
