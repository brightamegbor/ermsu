import { Office } from "./office";
import { Injectable } from "@angular/core";
import { Student } from "../shared/student"; // Student data type interface class
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database"; // Firebase modules for Database, Data list and Single object
import { Classroom } from "./classroom";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  studentsRef: AngularFireList<any>; // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>; // Reference to Student object, its an Observable too

  studentSearchRef: AngularFireList<any>;
  staffSearchRef: AngularFireList<any>;

  classroomsRef: AngularFireList<any>;
  classroomRef: AngularFireObject<any>;

  classrecordRef: AngularFireObject<any>;
  classrecordsRef: AngularFireList<any>;

  officesRef: AngularFireList<any>;
  officeRef: AngularFireObject<any>;

  officeRecordsRef: AngularFireList<any>;
  officeRecordRef: AngularFireObject<any>;

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Create Student
  AddStudent(student: Student) {
    this.studentsRef.push({
      index: student.index,
      firstName: student.firstName,
      lastName: student.lastName,
      programme: student.programme,
      level: student.level,
      session: student.session,
      email: student.email,
      mobileNumber: student.mobileNumber,
      photo: student.photo,
    });
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object("students-list/" + id);
    return this.studentRef;
  }
  // search for student using index number
  SearchStudent(index: string) {
    this.studentSearchRef = this.db.list("students-list", (ref) =>
      ref.orderByChild("index").equalTo(index)
    );
    return this.studentSearchRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list("students-list", (ref) =>
      ref.orderByChild("firstName")
    );
    return this.studentsRef;
  }

  // Update Student Object
  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber,
    });
  }

  // Delete Student Object
  DeleteStudent(id: string) {
    this.studentRef = this.db.object("students-list/" + id);
    this.studentRef.remove();
  }

  AddClassRecord(classroom: Classroom) {
    this.classrecordsRef.push({
      index: classroom.index,
      studentName: classroom.studentName,
      className: classroom.className,
      startDate: classroom.startDate.getTime(),
      endDate: classroom.endDate,
      // startTime: classroom.startTime,
      // endTime: classroom.endTime
    });
  }

  AddOfficeRecord(office: Office) {
    this.officeRecordsRef.push({
      addedBy: office.addedBy,
      staffID: office.staffID,
      staffName: office.staffName,
      officeName: office.officeName,
      startDate: office.startDate.getTime(),
      endDate: office.endDate,
      // startTime: classroom.startTime,
      // endTime: classroom.endTime
    });
  }

  // Fetch Single Student Object
  GetClassrecord(id: string) {
    this.classrecordRef = this.db.object("classrecords-list/" + id);
    return this.classrecordRef;
  }

  GetOfficerecord(id: string) {
    this.officeRecordRef = this.db.object("officerecords-list/" + id);
    return this.officeRecordRef;
  }

  // Fetch Students List
  GetClassroomsList() {
    this.classroomsRef = this.db.list("classrooms-list");
    return this.classroomsRef;
  }
  GetOfficesList() {
    this.officesRef = this.db.list("office-list", (ref) =>
      ref.orderByChild("staffName")
    );
    return this.officesRef;
  }

  GetStaffName(officeName: string) {
    this.staffSearchRef = this.db.list("office-list", (ref) =>
      ref.orderByChild("officeName").equalTo(officeName)
    );
    return this.staffSearchRef;
  }

  GetClassroomsInput(status: string) {
    let newClassroomsRef = this.db.list("classrooms-list", (ref) =>
      ref.orderByChild("status").equalTo(status)
    );
    return newClassroomsRef;
  }

  GetClosedOfficesList() {
    let newOfficesRef = this.db.list("office-list", (ref) =>
      ref.orderByChild("status").equalTo("closed")
    );
    return newOfficesRef;
  }

  GetClassroom(id: string) {
    this.classroomRef = this.db.object("classrooms-list/" + id);
    return this.classroomRef;
  }

  GetClassRecordsList() {
    this.classrecordsRef = this.db.list("classrecords-list");
    return this.classrecordsRef;
  }

  GetOfficeRecordsList() {
    this.officeRecordsRef = this.db.list("officerecords-list");
    return this.officeRecordsRef;
  }

  // Update Student Object
  UpdateClassRecord(classroom: Classroom) {
    this.classrecordRef.update({
      index: classroom.index,
      studentName: classroom.studentName,
      className: classroom.className,
      startDate: classroom.startDate,
      endDate: classroom.endDate.getTime(),
      // startTime: classroom.startTime,
      // endTime: classroom.endTime
    });
  }

  // Update Office Record
  UpdateOfficeRecord(office: Office) {
    this.officeRecordRef.update({
      staffID: office.staffID,
      staffName: office.staffName,
      officeName: office.officeName,
      startDate: office.startDate,
      endDate: office.endDate.getTime(),
      // startTime: classroom.startTime,
      // endTime: classroom.endTime
    });
  }

  UpdateClassRoom(id: string, status: string) {
    const newClass = this.db.object("classrooms-list/" + id);
    newClass.update({
      status: status,
    });
  }

  UpdateOffice(id: string, status: string) {
    const newOffice = this.db.object("office-list/" + id);
    newOffice.update({
      status: status,
    });
  }
}
