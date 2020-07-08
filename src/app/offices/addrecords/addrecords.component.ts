import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/shared/crud.service";
import { ToastrService } from "ngx-toastr";
import { Office } from "src/app/shared/office";
import { Location } from "@angular/common"; // Location service is used to go back to previous component

@Component({
  selector: "app-addrecords",
  templateUrl: "./addrecords.component.html",
  styleUrls: ["./addrecords.component.css"],
})
export class AddrecordsComponent implements OnInit {
  public newOfficesForm: FormGroup; // Define FormGroup to student's form
  Office: Office[];

  constructor(
    public crudApi: CrudService, // CRUD API services
    private location: Location,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.crudApi.GetOfficesList(); // Call GetStudentsList() before main form is being called
    this.crudApi.GetOfficeRecordsList();
    this.newOfficeForm(); // Call student form when component is ready

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetOfficesList();
    s.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Office = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Office.push(a as Office);
      });
      console.log(this.Office);
    });
  }

  // Reactive student form
  newOfficeForm() {
    this.newOfficesForm = this.fb.group({
      staffID: ["", [Validators.required, Validators.minLength(8)]],
      staffName: ["", [Validators.required, Validators.minLength(2)]],
      officeName: ["", [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [""],
      // startTime: ['', [Validators.required]],
      // endTime: ['']
    });
  }

  // Accessing form control using getters
  get staffID() {
    return this.newOfficesForm.get("staffID");
  }

  get staffName() {
    return this.newOfficesForm.get("staffName");
  }

  get officeName() {
    return this.newOfficesForm.get("officeName");
  }

  get startDate() {
    return this.newOfficesForm.get("startDate");
  }

  get endDate() {
    return this.newOfficesForm.get("endDate");
  }

  get startTime() {
    return this.newOfficesForm.get("startTime");
  }

  get endTime() {
    return this.newOfficesForm.get("endTime");
  }
  // get classNameValue() {
  //   return this.newClassroomsForm.get('className').value;
  // }

  // Reset student form's values
  ResetForm() {
    if (window.confirm("Are sure you want to reset ?")) {
      this.newOfficesForm.reset();
    }
  }

  ResetForm2() {
    this.newOfficesForm.reset();
  }

  goBack() {
    this.location.back();
  }

  changeOffice(e) {
    this.officeName.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  submitOfficeData() {
    console.log(this.newOfficesForm.value);
    let id = this.newOfficesForm.value.officeName;
    console.log("id >>>>>", id);

    this.crudApi.UpdateOffice(id, "opened");

    this.crudApi.AddOfficeRecord(this.newOfficesForm.value); // Submit offices data using CRUD API
    this.toastr.success(
      this.newOfficesForm.controls["officeName"].value +
        " record successfully added!"
    ); // Show success message when data is successfully submited

    this.ResetForm2(); // Reset form when clicked on reset button
  }

  dataState() {
    this.crudApi
      .GetOfficesList()
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
