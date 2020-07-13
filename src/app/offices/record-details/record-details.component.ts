import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common"; // Location service is used to go back to previous component
import { Office } from "src/app/shared/office";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.component.html",
  styleUrls: ["./record-details.component.css"],
})
export class RecordDetailsComponent implements OnInit {
  officeDetail: any;

  constructor(
    private crudApi: CrudService,
    private location: Location,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get("id"); // Getting current component's id or information using ActivatedRoute service
    this.crudApi
      .GetOfficerecord(id)
      .valueChanges()
      .subscribe((data) => {
        // console.log(data);
        this.officeDetail = data;
      });
  }

  goBack() {
    this.location.back();
  }
}
