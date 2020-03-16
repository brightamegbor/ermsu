import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classrecords',
  templateUrl: './classrecords.component.html',
  styleUrls: ['./classrecords.component.css']
})
export class ClassrecordsComponent implements OnInit {
  public newClassroomsForm: FormGroup;  // Define FormGroup to student's form

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.crudApi.GetClassroomsList();  // Call GetStudentsList() before main form is being called
    this.crudApi.GetClassRecordsList();
    this.newClassroomForm();              // Call student form when component is ready
  }

  // Reactive student form
  newClassroomForm() {
    this.newClassroomsForm = this.fb.group({
      index: [''],
      studentName: ['', [Validators.required, Validators.minLength(2)]],
      className: [''],
      startTime: [''],
      endTime: [''],
      status: ['']
    });
  }

  // Accessing form control using getters
  get index() {
    return this.newClassroomsForm.get('index');
  }

  get firstName() {
    return this.newClassroomsForm.get('studentName');
  }

  get lastName() {
    return this.newClassroomsForm.get('className');
  }

  get programme() {
    return this.newClassroomsForm.get('startTime');
  }

  get level() {
    return this.newClassroomsForm.get('endTime');
  }

  get session() {
    return this.newClassroomsForm.get('status');
  }

  // Reset student form's values
  ResetForm() {
    this.newClassroomsForm.reset();
  }

  submitClassroomData() {
    this.crudApi.AddClassRecord(this.newClassroomsForm.value); // Submit classroom data using CRUD API
    this.toastr.success(
      this.newClassroomsForm
      .controls['className'].value + ' record successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   }

}
