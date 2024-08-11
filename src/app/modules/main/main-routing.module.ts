import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { AnimalsControlComponent } from './components/animals-control/animals-control.component';
import { UsersComponent } from './components/users/users.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { DoctorWorkingHoursComponent } from './components/doctor-working-hours/doctor-working-hours.component';
import { MedicalRecordComponent } from './components/medical-record/medical-record.component';
import { AnimalRecordsComponent } from './components/medical-record/animal-records/animal-records.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'animal', component: AnimalsControlComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'adoption', component: AdoptionComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'emergency', component: EmergencyComponent },
      { path: 'doctor-appointments', component: DoctorAppointmentsComponent },
      { path: 'working-hours', component: DoctorWorkingHoursComponent },
      { path: 'medical-records', component: MedicalRecordComponent },
      { path: 'medical-records/:animalId', component: AnimalRecordsComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
