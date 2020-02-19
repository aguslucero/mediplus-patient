import { AuthService } from 'src/app/containers/services/auth.service/auth.service';
import { Appointment } from './../../Models/appointment';
import { BackService } from 'src/app/containers/services/back.service';
import { AppointmentService } from './../../containers/services/appointment.service/appointment.service';
import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppointmentRequestComponent } from '../appointment-request/appointment-request.component';
import * as moment from 'moment';
import { PhoneNumber } from './../../Models/phone';
import { WindowService } from './../../containers/services/window.service/window.service';
import * as firebase from 'firebase';
import { User } from 'src/app/Models/user';


@Component({
  selector: 'app-stepper-appointment',
  templateUrl: './stepper-appointment.component.html',
  styleUrls: ['./stepper-appointment.component.scss']
})
export class StepperAppointmentComponent implements OnInit {

  windowRef: any;
  verificationCode: string;
  newUser = new User('', '', '', '', '', '');
  user: User;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  dateSelected: string;
  nextDay = new Date();
  selectedDay = new Date();
  turn = new Turn();


  constructor(private _formBuilder: FormBuilder,
              private appointmentService: AppointmentService,
              private backService: BackService,
              public dialogRef: MatDialogRef<AppointmentRequestComponent>,
              private windowService: WindowService,
              private auth: AuthService,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    const firebaseConfig = {
      apiKey: 'AIzaSyC2hO7gE6HGux48_R4cQtgCHwNz45ktMxQ',
      authDomain: 'mediplus-antentication.firebaseapp.com',
      databaseURL: 'https://mediplus-antentication.firebaseio.com',
      projectId: 'mediplus-antentication',
      storageBucket: 'mediplus-antentication.appspot.com',
      messagingSenderId: '97310092855',
      appId: '1:97310092855:web:58d311125ec2b22a2819b2',
      measurementId: 'G-RC49PHRXG9'
    };
    this.getCurrentUser();
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.windowRef = this.windowService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',  {
    size: 'invisible',
    callback: function(response) {
      // reCAPTCHA solved - will proceed with submit function
      console.log(response);
    },
    'expired-callback': function() {
      // Reset reCAPTCHA?
    }
  });
    moment.locale('es');
    this.getNextAppointment();
    console.log(this.user);
  }

getNextAppointment() {
  this.nextDay = new Date();
  console.log(this.data);
this.appointmentService.getNext(this.data.doctor._id).subscribe(
  (res: any) => {
    this.nextDay.date = res.date;
    this.nextDay.dateName = moment(res.date, 'DD-MM-YYYY' ).format('dddd');
    this.getDay(res.date);
    console.log('nextDay', this.nextDay);
  },
  (err) => console.log(err)
);
}

getAppointmentsOnDay() {
  this.selectedDay = new Date();
  const day =  moment(this.dateSelected).format('DD-MM-YYYY');
  this.appointmentService.getOnDay(this.data.doctor._id, day).subscribe(
    (data: string[]) => {
      this.selectedDay.date = moment(this.dateSelected).format('DD-MM-YYYY');
      this.selectedDay.dateName = moment(this.dateSelected, 'DD-MM-YYYY' ).format('dddd');
      this.selectedDay.availableHours = data;
      console.log('selectedDAy', this.selectedDay);

  },
  (err) => console.log(err)
);
}

getDay(date: string) {
  this.appointmentService.getOnDay(this.data.doctor._id, date).subscribe(
    (data: string[]) => {
      this.nextDay.availableHours = data;
  },
  (err) => console.log(err)
);

}
requetsAppointment() {
this.backService.requetsAppointmentLoged(this.data.doctor.id, this.turn.date, this.turn.hour, this.turn.observation).subscribe(
  data => {
    console.log(data);
  },
  (err) => console.log(err)
);
}

  requetsAppointmentAndCreateUser() {
  this.backService.createPatient(this.newUser).subscribe(
   res => {
      this.newUser.id = res.user._id;
      this.backService.requetsAppointment(this.data.doctor.id, this.newUser.id,
              this.turn.date, this.turn.hour, this.turn.observation ).subscribe(
        result => {
          console.log(result);
        },
        (err) => console.log(err)
      );
    },
    err => console.log(err)
  );
  }

sendLoginCode() {

  const appVerifier = this.windowRef.recaptchaVerifier;

  let num = '+54' + this.newUser.phone;
  if ( this.user ) {
    num = '+54' + this.user.phone;
  }

  firebase.auth().signInWithPhoneNumber(num, appVerifier)
          .then(result => {
              this.windowRef.confirmationResult = result;

          })
          .catch( error => console.log(error) );

}

verifyLoginCode() {
  this.windowRef.confirmationResult
                .confirm(this.verificationCode)
                .then( result => {
                   if ( this.user ) {
                     this.requetsAppointment();
                   } else {
                     this.requetsAppointmentAndCreateUser();
                    }

  })
  .catch( error => console.log(error, 'Incorrect code entered?'));
}

getCurrentUser() {
  this.auth.currentUser().subscribe(
    data => {
      this.user = new User(data._id, data.person.firstName, data.person.lastName,
                           data.person.phone, data.person.birthDate, data.person.dni);
    },
  );
}

selectTurn( date: string, hour: string ) {
  this.turn.date = date;
  this.turn.hour = hour;

}



}

export class Date {
  date: string;
  dateName: string;
  availableHours: string[];
}

export class Turn {
  date: string;
  hour: string;
  observation: string;
}
