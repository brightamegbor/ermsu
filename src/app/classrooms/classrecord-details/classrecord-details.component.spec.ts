import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassrecordDetailsComponent } from './classrecord-details.component';

describe('ClassrecordDetailsComponent', () => {
  let component: ClassrecordDetailsComponent;
  let fixture: ComponentFixture<ClassrecordDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassrecordDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassrecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
