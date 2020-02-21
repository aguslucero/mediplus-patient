import { Component, OnInit } from '@angular/core';
import * as fromPatientVIewState from '../../containers/reducers/index';
import { Appointment } from 'src/app/Models/appointment';
import { BackService } from 'src/app/containers/services/back.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppointmentResponse } from 'src/app/Responses/Appointments.response';
import * as PatientViewActions from '../../containers/actions/patient-view-status.actions';

@Component({
  selector: 'app-all-appointments-history',
  templateUrl: './all-appointments-history.component.html',
  styleUrls: ['./all-appointments-history.component.scss']
})
export class AllAppointmentsHistoryComponent implements OnInit {

  allAppointmentslist: Appointment[] = [];
  loader = false;

  constructor( private backService: BackService, private http: HttpClient,
    private patientViewStore: Store<fromPatientVIewState.State>
 ) { }

  ngOnInit() {
    this.allAppointmentslist = [];
    this.loader = true;
    this.backService.getAllAppointmentsFromPatient().subscribe((appointment) => {
      this.loader = false;
      appointment.forEach((appoint: AppointmentResponse) => {
        this.allAppointmentslist.push(new Appointment(appoint._id, appoint.doctor.person.firstName, appoint.doctor.person.lastName, appoint.doctor.speciality, appoint.date, appoint.hour))
      });
    });
    console.log(this.allAppointmentslist);
  }

  goToHome = () => {
    this.patientViewStore.dispatch(new PatientViewActions.Home);
  }

}
