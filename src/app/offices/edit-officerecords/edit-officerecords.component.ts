import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/shared/crud.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "src/app/classrooms/editrecords/editrecords.component";
import { Location } from "@angular/common"; // Location service is used to go back to previous component

export interface DialogData {
  confirmMsgY: string;
  confirmMsgN: string;
}

@Component({
  selector: "app-edit-officerecords",
  templateUrl: "./edit-officerecords.component.html",
  styleUrls: ["./edit-officerecords.component.css"],
})
export class EditOfficerecordsComponent implements OnInit {
  editForm: FormGroup; // Define FormGroup to student's edit form
  comfirmation: any;
  confirmMsgY: string;
  confirmMsgN: string;

  constructor(
    private crudApi: CrudService, // Inject CRUD API in constructor
    private fb: FormBuilder, // Inject Form Builder service for Reactive forms
    private location: Location, // Location service to go back to previous component
    private actRoute: ActivatedRoute, // Activated route to get the current component's inforamation
    private router: Router, // Router service to navigate to specific component
    private toastr: ToastrService, // Toastr service for alert message
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateOfficeRecordData(); // Call updateStudentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.crudApi
      .GetOfficerecord(id)
      .valueChanges()
      .subscribe((data) => {
        // console.log(data);
        this.editForm.setValue(data); // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
      });
  }

  // Accessing form control using getters
  get staffID() {
    return this.editForm.get("staffID");
  }

  get staffName() {
    return this.editForm.get("staffName");
  }

  get officeName() {
    return this.editForm.get("officeName");
  }

  get startDate() {
    return this.editForm.get("startDate");
  }

  get endDate() {
    return this.editForm.get("endDate");
  }

  // Contains Reactive Form logic
  updateOfficeRecordData() {
    this.editForm = this.fb.group({
      staffID: ["", [Validators.required, Validators.minLength(8)]],
      staffName: ["", [Validators.required, Validators.minLength(2)]],
      officeName: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    // alert('are you sure you want to submit? this action cannot be undone');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "250px",
      data: { confirmMsgY: "yes", confirmMsgN: "no" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmMsgY = result;

      if (this.confirmMsgY === "yes") {
        let id = this.editForm.value.officeName;
        console.log("id >>>>>", id);

        this.crudApi.UpdateOffice(id, "closed");

        this.crudApi.UpdateOfficeRecord(this.editForm.value); // Update student data using CRUD API
        this.toastr.success(
          this.editForm.controls["officeName"].value + " updated successfully"
        ); // Show succes message when data is successfully submited
        this.router.navigate(["officerecords"]);
      } // Navigate to student's list page when student data is updated
    });
  }
}
