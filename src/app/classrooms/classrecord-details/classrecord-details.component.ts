import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { Classroom } from "src/app/shared/classroom";

@Component({
  selector: "app-classrecord-details",
  templateUrl: "./classrecord-details.component.html",
  styleUrls: ["./classrecord-details.component.css"],
})
export class ClassrecordDetailsComponent implements OnInit {
  classDetail: any;

  constructor(
    private crudApi: CrudService,
    private location: Location,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.crudApi
      .GetClassrecord(id)
      .valueChanges()
      .subscribe((data) => {
        // console.log(data);
        this.classDetail = data;
      });
  }

  goBack() {
    this.location.back();
  }
}
