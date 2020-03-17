import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Classroom } from 'src/app/shared/classroom';

@Component({
  selector: 'app-classrecords',
  templateUrl: './classrecords.component.html',
  styleUrls: ['./classrecords.component.css']
})
export class ClassrecordsComponent implements OnInit {
  public newClassroomsForm: FormGroup;  // Define FormGroup to student's form
  Classroom: Classroom[];

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.crudApi.GetClassroomsList();  // Call GetStudentsList() before main form is being called
    this.crudApi.GetClassRecordsList();
    this.newClassroomForm();              // Call student form when component is ready

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetClassroomsList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Classroom = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Classroom.push(a as Classroom);
      });
    });
  }

  // Reactive student form
  newClassroomForm() {
    this.newClassroomsForm = this.fb.group({
      index: ['', [Validators.required, Validators.minLength(12)]],
      studentName: ['', [Validators.required, Validators.minLength(2)]],
      className: ['', [Validators.required]],
      startTime: [''],
      endTime: ['']
    });
  }

  // Accessing form control using getters
  get index() {
    return this.newClassroomsForm.get('index');
  }

  get studentName() {
    return this.newClassroomsForm.get('studentName');
  }

  get className() {
    return this.newClassroomsForm.get('className');
  }

  get startTime() {
    return this.newClassroomsForm.get('startTime');
  }

  get endTime() {
    return this.newClassroomsForm.get('endTime');
  }

  // get classNameValue() {
  //   return this.newClassroomsForm.get('className').value;
  // }

  // Reset student form's values
  ResetForm() {
    this.newClassroomsForm.reset();
  }

  submitClassroomData() {
    this.crudApi.AddClassRecord(this.newClassroomsForm.value); // Submit classroom data using CRUD API
    this.toastr.success(
      this.newClassroomsForm
      .controls['className'].value + ' record successfully added!'); // Show success message when data is successfully submited
    // this.crudApi.UpdateClassRoom(id);
    this.ResetForm();  // Reset form when clicked on reset button
   }

   dataState() {
    this.crudApi.GetClassroomsList().valueChanges().subscribe(data => {
      // this.preLoader = false;
      if (data.length <= 0) {
        // this.hideWhenNoClassroom = false;
        // this.noData = true;
      } else {
        // this.hideWhenNoClassroom = true;
        // this.noData = false;
      }
    })
  }

}
