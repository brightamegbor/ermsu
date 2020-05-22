import { FormGroup,
    FormBuilder,
    Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Student } from '../shared/student';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {
  public searchStudent: FormGroup;
  Student: Student[];
  preLoader: boolean;
  noData: boolean;
  hideWhenNoStudent: boolean;

  constructor(public crudApi: CrudService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.newStudentForm();
  }

  newStudentForm() {
    this.searchStudent = this.fb.group({
      index: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get index() {
    return this.searchStudent.get('index');
  }

  submitStudentData() {
    this.preLoader = true;
    console.log((this.searchStudent.value.index));
    this.crudApi.SearchStudent((this.searchStudent.value.index))
    .valueChanges().subscribe(
      result => {
        this.Student = result;
        this.preLoader = false;
        if (result.length <= 0 ) {
          this.hideWhenNoStudent = false;
          this.noData = true;
        } else {
          this.hideWhenNoStudent = true;
          this.noData = false;
        }
      }
    );
  }

}
