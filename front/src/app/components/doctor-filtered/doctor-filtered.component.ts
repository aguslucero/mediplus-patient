import { StepperAppointmentComponent } from './../stepper-appointment/stepper-appointment.component';
import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import * as fromPatientVIewState from '../../containers/reducers/index';
import * as PatientViewActions from '../../containers/actions/patient-view-status.actions';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule } from '@angular/material';
import { AppointmentRequestComponent } from '../appointment-request/appointment-request.component';
import { Doctor } from 'src/app/Models/doctor';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-doctor-filtered',
  templateUrl: './doctor-filtered.component.html',
  styleUrls: ['./doctor-filtered.component.scss']
})
export class DoctorFilteredComponent implements OnInit {

  @Input() doctor: Doctor;
  showRequestComponent: boolean;

  constructor(
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.showRequestComponent = false;
  }
  requestAppointment(): void {
    const dialogRef = this.dialog.open(StepperAppointmentComponent, {
      data: {
        doctor: this.doctor,
      }
    });
    dialogRef.componentInstance.getNextAppointment();

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
