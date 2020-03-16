import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  public studentForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.studenForm();              // Call student form when component is ready
  }

  // Reactive student form
  studenForm() {
    this.studentForm = this.fb.group({
      index: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      programme: [''],
      level: [''],
      session: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      photo: [''],
    })  
  }

  // Accessing form control using getters
  get index() {
    return this.studentForm.get('index');
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }  

  get programme() {
    return this.studentForm.get('programme');
  } 

  get level() {
    return this.studentForm.get('level');
  } 

  get session() {
    return this.studentForm.get('session');
  } 

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }

  get photo() {
    return this.studentForm.get('photo');
  } 

  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value); // Submit student data using CRUD API
    this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}