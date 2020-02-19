import { User } from './../../Models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class BackService {

  constructor(private httpClient: HttpClient) {

  }
  getAllDoctors(): Observable<any> {
    return this.httpClient.get('/doctors/all');
  }

  getBySpeciality(speciality: string): Observable<any> {
    return this.httpClient.get('/doctors/specialist/' + speciality);
  }

  // se utiliza para crear un turno cuando no se tiene un paciente logueado
  requetsAppointment(doctorId: string, patientId: string, date: string, hour: string, observation: string): Observable<any> {
    return this.httpClient.post('/doctors/request-appointment', {
      doctor_id: doctorId,
      patient_id: patientId,
      date: date,
      hour: hour,
      observation: observation
    });
  }
// se utiliza para crear un turno cuando  se tiene un paciente logueado
  requetsAppointmentLoged(doctorId: string,  date: string, hour: string, observation: string): Observable<any> {
    return this.httpClient.post('/doctors/request-appointment-logged', {
      doctor_id: doctorId,
      date: date,
      hour: hour,
      observation: observation
    },
    {headers: new HttpHeaders({'Authorization': localStorage.getItem('token') })}
      );
  }

  getAllAppointmentsFromPatient(): Observable<any> {
    return this.httpClient.get('/appointments/patient',
    {headers: new HttpHeaders({'Authorization': localStorage.getItem('token') })} );
  }

  createPatient( user: User): Observable<any> {
    return this.httpClient.post('/pacientes/createPatient', { user

    });
  }



}
