import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorBol: boolean;
  errorMSG: string;
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.errorBol = false;
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.router.navigate(["<!-- enter your route name here -->"]);
        console.log("success");
      })
      .catch((error) => {
        // window.alert(error.message);
        this.errorBol = true;
        this.errorMSG =
          "There is no user record corresponding to this credentials. Please contact admin for assistance";
      });
  }

  // <!-- SignOut method for logging out from the Angular/Firebase app -->
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      // this.router.navigate(["sign-in"]);
      console.log("logout");
    });
  }

  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "You must enter a value";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }
}
