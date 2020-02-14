import { Component, OnInit } from '@angular/core';
import * as fromPatientVIewState from '../../containers/reducers/index';
import * as PatientViewActions from '../../containers/actions/patient-view-status.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.scss']
})
export class PatientHomePageComponent implements OnInit {

  constructor(
    private patientViewStore: Store<fromPatientVIewState.State>
  ) { }

  ngOnInit() {
  }
  goToAllAppointmentsHistory() {
    this.patientViewStore.dispatch(new PatientViewActions.AllAppointmentHistory);
  }
  goToSelectSpecialist() {
    this.patientViewStore.dispatch(new PatientViewActions.SelectSpecialist);
  }
  goToProfile() {
    this.patientViewStore.dispatch(new PatientViewActions.PatientProfile);
  }
}
