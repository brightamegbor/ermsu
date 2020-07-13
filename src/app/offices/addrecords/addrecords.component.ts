import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { CrudService } from "src/app/shared/crud.service";
import { ToastrService } from "ngx-toastr";
import { Office } from "src/app/shared/office";
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-addrecords",
  templateUrl: "./addrecords.component.html",
  styleUrls: ["./addrecords.component.css"],
})
export class AddrecordsComponent implements OnInit {
  public newOfficesForm: FormGroup; // Define FormGroup to student's form
  Office: Office[];
  staffSearch: Office[];
  user: string;

  constructor(
    public crudApi: CrudService, // CRUD API services
    private location: Location,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.crudApi.GetClosedOfficesList(); // Call GetStudentsList() before main form is being called
    this.crudApi.GetOfficeRecordsList();
    this.newOfficeForm(); // Call student form when component is ready

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetClosedOfficesList();
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

    this.afAuth.authState.subscribe((user) => {
      this.user = user.email.toString();

      this.newOfficesForm.get("addedBy").setValue(this.user);
    });

    // this.newOfficesForm.controls["addedBy"].setValue(this.user);
    // this.newOfficesForm.get("addedBy").setValue(this.user);
  }

  // Reactive student form
  newOfficeForm() {
    this.newOfficesForm = this.fb.group({
      addedBy: [""],
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
  get addedBy() {
    return this.newOfficesForm.get("addedBy");
  }
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

    this.staffNameSearch(this.newOfficesForm.value.officeName);
  }

  changeStaff(e) {
    this.staffName.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  staffNameSearch(officeName: string) {
    let search = this.crudApi.GetStaffName(officeName);
    search.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.staffSearch = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.staffSearch.push(a as Office);
      });
      console.log(this.staffSearch);
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
    this.router.navigate(["officerecords"]);
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
