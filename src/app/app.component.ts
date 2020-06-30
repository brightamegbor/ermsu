import { Component, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ERecordManager";
  @ViewChild("drawer", { static: false }) drawer: MatSidenav;

  constructor(public afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.auth.signOut();
  }

  closeSidebar() {
    this.drawer.close();
  }
}
