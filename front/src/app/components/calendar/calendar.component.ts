import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Models/appointment';
import { BackService } from 'src/app/containers/services/back.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppointmentResponse } from 'src/app/Responses/Appointments.response';
import * as fromPatientVIewState from '../../containers/reducers/index';
import * as PatientViewActions from '../../containers/actions/patient-view-status.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  allAppointmentslist: Appointment[] = [];
  sorted: Appointment[] = [];
  today = moment().format('DD-MM-YYYY');
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
        const appointDate = moment(appoint.date, 'DD-MM-YYYY').format('DD-MM-YYYY');

        if (this.today <= appointDate) {
          // tslint:disable-next-line: max-line-length
          this.allAppointmentslist.push(new Appointment(appoint._id, appoint.doctor.person.firstName, appoint.doctor.person.lastName, appoint.doctor.speciality, appoint.date, appoint.hour));
        }
        });
    });
  }

  goToHome = () => {
    this.patientViewStore.dispatch(new PatientViewActions.Home);
  }

}
