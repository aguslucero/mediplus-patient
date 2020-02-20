import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as fromPatientVIewState from '../../containers/reducers/index';
import * as PatientViewActions from '../../containers/actions/patient-view-status.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SuccessDialogComponent >,
               private patientViewStore: Store<fromPatientVIewState.State>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('la data', this.data);
  }


  goToHome() {
    this.dialogRef.close();
    this.data.dialog.close();
    this.patientViewStore.dispatch(new PatientViewActions.Home);
  }

}
