import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassrecordsComponent } from './classrecords.component';

describe('ClassrecordsComponent', () => {
  let component: ClassrecordsComponent;
  let fixture: ComponentFixture<ClassrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
