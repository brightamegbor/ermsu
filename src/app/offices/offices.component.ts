import { Component, OnInit } from "@angular/core";
import { CrudService } from "../shared/crud.service";
import { ToastrService } from "ngx-toastr";
import { Office } from "../shared/office";

@Component({
  selector: "app-offices",
  templateUrl: "./offices.component.html",
  styleUrls: ["./offices.component.css"],
})
export class OfficesComponent implements OnInit {
  p: number = 1; // Fix for AOT compilation error for NGX pagination
  Office: Office[]; // Save students data in Student's array.
  hideWhenNoOffice: boolean = false; // Hide students data table when no student.
  noData: boolean = false; // Showing No Student Message, when no student in database.
  preLoader: boolean = true;
  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService
  ) {}

  ngOnInit() {
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
    });
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
