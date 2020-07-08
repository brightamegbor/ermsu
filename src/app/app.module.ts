import { UserServiceService } from "./auth/user-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Components
import { AddStudentComponent } from "./add-student/add-student.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";

// Reactive Form Module
import { ReactiveFormsModule } from "@angular/forms";

// Firebase Modules
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";

// Router Module
import { AppRoutingModule } from ".//app-routing.module";

// Toaster for Alert Messages
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

// NGX Pagination
import { NgxPaginationModule } from "ngx-pagination";

import { AppComponent } from "./app.component";
import { ClassroomsComponent } from "./classrooms/classrooms.component";
import { OfficesComponent } from "./offices/offices.component";
import { ClassrecordsComponent } from "./classrooms/classrecords/classrecords.component";
import {
  EditrecordsComponent,
  ConfirmationDialogComponent,
} from "./classrooms/editrecords/editrecords.component";
import { AddrecordsComponent } from "./offices/addrecords/addrecords.component";

import { ViewRecordComponent } from "./classrooms/view-record/view-record.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { SearchStudentComponent } from "./search-student/search-student.component";
import { MaterialModule } from "./material.module";
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material';
import { LoginComponent } from "./auth/login/login.component";
import { UserServiceModuleModule } from "./auth/user-service-module/user-service-module.module";
import { OfficeRecordsComponent } from './offices/office-records/office-records.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // tosUrl: "<your-tos-link>",
  // privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    StudentsListComponent,
    EditStudentComponent,
    ClassroomsComponent,
    OfficesComponent,
    ClassrecordsComponent,
    EditrecordsComponent,
    AddrecordsComponent,
    ViewRecordComponent,
    SearchStudentComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    OfficeRecordsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    NgxPaginationModule, // NGX pagination module
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MaterialModule,
    UserServiceModuleModule,
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [UserServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
