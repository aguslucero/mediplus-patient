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
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery';




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
    SingUpComponent
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
    AppRoutingModule


  ],
  providers: [
    BackService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AppointmentRequestComponent,
    CommentComponent
  ],
})
export class AppModule { }
