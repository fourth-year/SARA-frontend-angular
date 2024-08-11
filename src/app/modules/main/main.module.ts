import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../../shared/shared.module';
import { BodyComponent } from './components/body/body.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDialogComponent } from './components/posts/post-dialog/post-dialog.component';
import { AnimalsControlComponent } from './components/animals-control/animals-control.component';
import { AnimalDialogComponent } from './components/animals-control/animals/animal-dialog/animal-dialog.component';
import { AnimalsComponent } from './components/animals-control/animals/animals.component';
import { AnimalTypesComponent } from './components/animals-control/animal-types/animal-types.component';
import { TypesListComponent } from './components/animals-control/animal-types/types-list/types-list.component';
import { DepartmentsComponent } from './components/animals-control/departments/departments.component';
import { DepartmentsListComponent } from './components/animals-control/departments/departments-list/departments-list.component';
import { UsersComponent } from './components/users/users.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { DoctorsDialogComponent } from './components/doctors/doctors-dialog/doctors-dialog.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RequestsComponent } from './components/employees/requests/requests.component';
import { SessionDialogComponent } from './components/sessions/session-dialog/session-dialog.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { AppointmentsComponent } from './components/doctors/appointments/appointments.component';
import { AppointmentDialogComponent } from './components/doctors/appointments/appointment-dialog/appointment-dialog.component';
import { CommentsDialogComponent } from './components/posts/comments-dialog/comments-dialog.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { DoctorWorkingHoursComponent } from './components/doctor-working-hours/doctor-working-hours.component';
import { MedicalRecordComponent } from './components/medical-record/medical-record.component';
import { AnimalRecordsComponent } from './components/medical-record/animal-records/animal-records.component';
import { MdicalRecordDialogComponent } from './components/medical-record/mdical-record-dialog/mdical-record-dialog.component';
import { WorkingHoursListComponent } from './components/doctor-working-hours/working-hours-list/working-hours-list.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
    BodyComponent,
    AnimalsComponent,
    AnimalDialogComponent,
    PostsComponent,
    PostDialogComponent,
    AnimalsControlComponent,
    AnimalTypesComponent,
    TypesListComponent,
    DepartmentsComponent,
    DepartmentsListComponent,
    UsersComponent,
    UserDialogComponent,
    SessionsComponent,
    DoctorsComponent,
    AdoptionComponent,
    DoctorsDialogComponent,
    EmployeesComponent,
    RequestsComponent,
    SessionDialogComponent,
    EmergencyComponent,
    AppointmentsComponent,
    AppointmentDialogComponent,
    CommentsDialogComponent,
    DoctorAppointmentsComponent,
    DoctorWorkingHoursComponent,
    MedicalRecordComponent,
    AnimalRecordsComponent,
    MdicalRecordDialogComponent,
    WorkingHoursListComponent,
    UpdateProfileComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
