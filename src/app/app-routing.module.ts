import { ViewRecordComponent } from './classrooms/view-record/view-record.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { OfficesComponent } from './offices/offices.component';
import { ClassrecordsComponent } from './classrooms/classrecords/classrecords.component';
import { EditrecordsComponent } from './classrooms/editrecords/editrecords.component';
import { AddrecordsComponent } from './offices/addrecords/addrecords.component';
import { SearchStudentComponent } from './search-student/search-student.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/view-students', pathMatch: 'full' },
  { path: 'register-student', component: AddStudentComponent },
  { path: 'view-students', component: StudentsListComponent },
  { path: 'search-student', component: SearchStudentComponent },
  { path: 'view-offices', component: OfficesComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'view-classrooms', component: ClassroomsComponent },
  { path: 'add-classrecords', component: ClassrecordsComponent },
  { path: 'edit-classrecords/:id', component: EditrecordsComponent },
  { path: 'add-officerecords', component: AddrecordsComponent },
  { path: 'view-records', component: ViewRecordComponent}
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
