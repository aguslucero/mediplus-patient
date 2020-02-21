import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PatientPageComponent } from './containers/patient-page/patient-page.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './containers/reducers/';
import { PatientHomePageComponent } from './components/patient-home-page/patient-home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { PatientRequestAppointmentsComponent } from './components/patient-request-appointments/patient-request-appointments.component';
import bootstrap from 'bootstrap';
import { PatientSelectSpecialistComponent } from './components/patient-select-specialist/patient-select-specialist.component';

import {HttpClientModule} from '@angular/common/http';
import { DoctorFilteredComponent } from './components/doctor-filtered/doctor-filtered.component';
import { AppointmentRequestComponent } from './components/appointment-request/appointment-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatDatepickerModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BackService } from './containers/services/back.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';
import { CommentComponent } from './components/comment/comment.component';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery';
import { RatingModule } from 'ng-starrating';
import { AllAppointmentsHistoryComponent } from './components/all-appointments-history/all-appointments-history.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LogInComponent } from './components/log-in/log-in.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { PhoneAuthComponent } from './components/phone-auth/phone-auth.component';
import { StepperAppointmentComponent } from './components/stepper-appointment/stepper-appointment.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarAppointmentComponent } from './components/calendar-appointment/calendar-appointment.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    PatientPageComponent,
    PatientHomePageComponent,
    HeaderComponent,
    PatientRequestAppointmentsComponent,
    PatientSelectSpecialistComponent,
    DoctorFilteredComponent,
    AppointmentRequestComponent,
    FooterComponent,
    AppointmentHistoryComponent,
    CommentComponent,
    AllAppointmentsHistoryComponent,
    SingInComponent,
    LogInComponent,
    StepperAppointmentComponent,
    PatientProfileComponent,
    PhoneAuthComponent,
    StepperAppointmentComponent,
    CalendarComponent,
    CalendarAppointmentComponent,
    SuccessDialogComponent

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('patientView', reducers),
    EffectsModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatMenuModule,
    AppRoutingModule,
    RatingModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatAutocompleteModule


  ],
  providers: [
    BackService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AppointmentRequestComponent,
    CommentComponent,
    SuccessDialogComponent,
    StepperAppointmentComponent
  ],
})
export class AppModule { }
