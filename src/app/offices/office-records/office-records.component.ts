import { Component, OnInit, ViewChild } from "@angular/core";
import { Office } from "src/app/shared/office";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { CrudService } from "src/app/shared/crud.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

@Component({
  selector: "app-office-records",
  templateUrl: "./office-records.component.html",
  styleUrls: ["./office-records.component.css"],
})
export class OfficeRecordsComponent implements OnInit {
  p: number = 1; // Fix for AOT compilation error for NGX pagination
  Office: Office[]; // Save students data in Student's array.
  hideWhenNoOffice: boolean = false; // Hide students data table when no student.
  noData: boolean = false; // Showing No Student Message, when no student in database.
  preLoader: boolean = true;
  sDate: Office[];

  displayedColumns = ["Staff ID", "Staff", "Office #", "Status", "Action"];

  dataSource = new MatTableDataSource<Office>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetOfficeRecordsList();
    s.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Office = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Office.push(a as Office);
        let startDate = item.payload.toJSON["startDate"];
        this.sDate = startDate;
      });

      this.dataSource.data = this.Office;
      // console.log(this.dataSource.data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 300);
    });
  }

  goBack() {
    this.location.back();
  }

  dataState() {
    this.crudApi
      .GetOfficesList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoOffice = false;
          this.noData = true;
        } else {
          this.hideWhenNoOffice = true;
          this.noData = false;
        }
      });
  }
}
