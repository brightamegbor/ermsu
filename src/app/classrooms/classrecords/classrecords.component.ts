import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/shared/crud.service";
import { ToastrService } from "ngx-toastr";
import { Classroom } from "src/app/shared/classroom";
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-classrecords",
  templateUrl: "./classrecords.component.html",
  styleUrls: ["./classrecords.component.css"],
})
export class ClassrecordsComponent implements OnInit {
  public newClassroomsForm: FormGroup; // Define FormGroup to student's form
  Classroom: Classroom[];

  user: string;

  constructor(
    public crudApi: CrudService, // CRUD API services
    private location: Location,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService, // Toastr service for alert message
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.crudApi.GetClassroomsList(); // Call GetStudentsList() before main form is being called
    this.crudApi.GetClassRecordsList();
    this.newClassroomForm(); // Call student form when component is ready

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetClassroomsInput("free");
    s.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Classroom = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Classroom.push(a as Classroom);
      });
      console.log(this.Classroom);
    });
    this.afAuth.authState.subscribe((user) => {
      this.user = user.email.toString();

      this.newClassroomsForm.get("addedBy").setValue(this.user);
    });
  }

  // Reactive student form
  newClassroomForm() {
    this.newClassroomsForm = this.fb.group({
      addedBy: [""],
      index: ["", [Validators.required, Validators.minLength(12)]],
      studentName: ["", [Validators.required, Validators.minLength(2)]],
      className: ["", [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [""],
      // startTime: ['', [Validators.required]],
      // endTime: ['']
    });
  }

  // Accessing form control using getters
  get addedBy() {
    return this.newClassroomsForm.get("addedBy");
  }

  get index() {
    return this.newClassroomsForm.get("index");
  }

  get studentName() {
    return this.newClassroomsForm.get("studentName");
  }

  get className() {
    return this.newClassroomsForm.get("className");
  }

  get startDate() {
    return this.newClassroomsForm.get("startDate");
  }

  get endDate() {
    return this.newClassroomsForm.get("endDate");
  }

  get startTime() {
    return this.newClassroomsForm.get("startTime");
  }

  get endTime() {
    return this.newClassroomsForm.get("endTime");
  }
  // get classNameValue() {
  //   return this.newClassroomsForm.get('className').value;
  // }

  // Reset student form's values
  ResetForm() {
    if (window.confirm("Are sure you want to reset ?")) {
      this.newClassroomsForm.reset();
    }
  }

  ResetForm2() {
    this.newClassroomsForm.reset();
  }

  goBack() {
    this.location.back();
  }

  changeClass(e) {
    this.className.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  submitClassroomData() {
    console.log(this.newClassroomsForm.value);
    let id = this.newClassroomsForm.value.className;
    console.log("id >>>>>", id);

    this.crudApi.UpdateClassRoom(id, "occupied");

    this.crudApi.AddClassRecord(this.newClassroomsForm.value); // Submit classroom data using CRUD API
    this.toastr.success(
      this.newClassroomsForm.controls["className"].value +
        " record successfully added!"
    ); // Show success message when data is successfully submited

    this.ResetForm2(); // Reset form when clicked on reset button
    this.router.navigate(["view-records"]);
  }

  dataState() {
    this.crudApi
      .GetClassroomsList()
      .valueChanges()
      .subscribe((data) => {
        // this.preLoader = false;
        if (data.length <= 0) {
          // this.hideWhenNoClassroom = false;
          // this.noData = true;
        } else {
          // this.hideWhenNoClassroom = true;
          // this.noData = false;
        }
      });
  }
}
