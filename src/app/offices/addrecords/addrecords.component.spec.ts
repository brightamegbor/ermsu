import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecordsComponent } from './addrecords.component';

describe('AddrecordsComponent', () => {
  let component: AddrecordsComponent;
  let fixture: ComponentFixture<AddrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
