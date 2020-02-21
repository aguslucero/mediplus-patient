export class User {
id: string;
name: string;
lastName: string;
phone: string;
birthDate: string;
dni: string;
prepaid: string;

constructor(id: string, name: string, lastName: string , phone: string, bdate: string, dni: string) {
  this.id = id ;
  this.name = name;
  this.lastName = lastName;
  this.phone = phone;
  this.birthDate = bdate;
  this.dni = dni;
}
}
