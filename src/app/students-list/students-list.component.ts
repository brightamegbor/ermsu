import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { CrudService } from "../shared/crud.service"; // CRUD API service class
import { Student } from "./../shared/student"; // Student interface class for Data types.
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit {
  p = 1; // Fix for AOT compilation error for NGX pagination
  Student: Student[]; // Save students data in Student's array.
  hideWhenNoStudent = false; // Hide students data table when no student.
  noData = false; // Showing No Student Message, when no student in database.
  preLoader = true; // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  displayedColumns = [
    "index",
    "studname",
    "programme",
    "level",
    "session",
    "email",
    "mobileNumber",
    "photo",
  ];
  dataSource = new MatTableDataSource<Student>();

  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) {}

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    // let studentList = [];

    this.dataState(); // Initialize student's list, when component is ready

    let s = this.crudApi.GetStudentsList();
    // s.query.orderByChild('index').limitToFirst(100);
    s.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Student.push(a as Student);
        // studentList.push(a);
      });

      this.dataSource.data = this.Student;
      // console.log(this.dataSource.data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 300);
    });
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the
  // state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in
  // student data list in real-time.
  dataState() {
    this.crudApi
      .GetStudentsList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoStudent = false;
          this.noData = true;
        } else {
          this.hideWhenNoStudent = true;
          this.noData = false;
        }
      });
  }

  // Method to delete student object
  deleteStudent(student) {
    if (window.confirm("Are sure you want to delete this student ?")) {
      // Asking from user before Deleting student data.
      this.crudApi.DeleteStudent(student.$key); // Using Delete student API to delete student.
      this.toastr.success(student.firstName + " successfully deleted!"); // Alert message will show up when student successfully deleted.
    }
  }
}
