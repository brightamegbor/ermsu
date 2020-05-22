import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Router Module
import { AppRoutingModule } from './/app-routing.module';

// Toaster for Alert Messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { OfficesComponent } from './offices/offices.component';
import { ClassrecordsComponent } from './classrooms/classrecords/classrecords.component';
import { EditrecordsComponent } from './classrooms/editrecords/editrecords.component';
import { AddrecordsComponent } from './offices/addrecords/addrecords.component';

import { ViewRecordComponent } from './classrooms/view-record/view-record.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SearchStudentComponent } from './search-student/search-student.component';


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
    SearchStudentComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module 
    AngularFireDatabaseModule,  // Firebase database module 
    ReactiveFormsModule,        // Reactive forms module
    AppRoutingModule,           // Main routing module
    BrowserAnimationsModule,    // Required animations module for Toastr
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule,  // NGX pagination module
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
