import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  confirmMsgY: string;
  confirmMsgN: string;
}

@Component({
  selector: 'app-editrecords',
  templateUrl: './editrecords.component.html',
  styleUrls: ['./editrecords.component.css']
})
export class EditrecordsComponent implements OnInit {

  editForm: FormGroup;  // Define FormGroup to student's edit form
  comfirmation: any;
  confirmMsgY: string;
  confirmMsgN: string;
  // public confirmationTemplate = `
  // <h1 mat-dialog-title>Confirmation</h1>
  // <div mat-dialog-content>
  //   <p>Are you sure you want to submit? This action cannot be undone</p>
  // </div>
  // <div mat-dialog-actions>
  //   <button mat-button [mat-dialog-close]="data.no">No</button>
  //   <button mat-button [mat-dialog-close]="data.yes" cdkFocusInitial>Yes</button>
  // </div>`;

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService,       // Toastr service for alert message
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateClassRecordData();   // Call updateStudentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetClassrecord(id).valueChanges().subscribe(data => {
      // console.log(data);
      this.editForm.setValue(data);  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    });
  }

  // Accessing form control using getters
  get index() {
    return this.editForm.get('index');
  }

  get studentName() {
    return this.editForm.get('studentName');
  }

  get className() {
    return this.editForm.get('className');
  }

  get startDate() {
    return this.editForm.get('startDate');
  }

  get endDate() {
    return this.editForm.get('endDate');
  }

  // Contains Reactive Form logic
  updateClassRecordData() {
    this.editForm = this.fb.group({
      index: ['', [Validators.required, Validators.minLength(12)]],
      studentName: ['', [Validators.required, Validators.minLength(2)]],
      className: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
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
      width: '250px',
      data: { confirmMsgY: 'yes', confirmMsgN: 'no'}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.confirmMsgY = result;

    if (this.confirmMsgY === 'yes') {
      let id = this.editForm.value.className;
      console.log('id >>>>>', id);

      this.crudApi.UpdateClassRoom(
        id, 'free'
      );

      this.crudApi.UpdateClassRecord(this.editForm.value);       // Update student data using CRUD API
      this.toastr.success(
        this.editForm.controls['className'].value + ' updated successfully');   // Show succes message when data is successfully submited
      this.router.navigate(['view-records']);
    }            // Navigate to student's list page when student data is updated


    });
  }

}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h1 mat-dialog-title>Confirmation</h1>
  <div mat-dialog-content>
    <p>Are you sure you want to submit? This action cannot be undone</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="data.confirmMsgN">No</button>
    <button mat-button [mat-dialog-close]="data.confirmMsgY" cdkFocusInitial>Yes</button>
  </div>`,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
