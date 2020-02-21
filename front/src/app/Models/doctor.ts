export class Doctor {

  private _rating: number;
  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    this._rating = value;
  }

  private _prepaid: string[];

  public get prepaid(): string[] {
    return this._prepaid;
  }
  public set prepaid(value: string[]) {
    this._prepaid = value;
  }

  private _speciality: string;
  public get speciality(): string {
    return this._speciality;
  }
  public set speciality(value: string) {
    this._speciality = value;
  }
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  private _firstname: string;
  public get firstname(): string {
    return this._firstname;
  }
  public set firstname(value: string) {
    this._firstname = value;
  }
  private _lastname: string;
  public get lastname(): string {
    return this._lastname;
  }
  public set lastname(value: string) {
    this._lastname = value;
  }
  private _birthdate: string;
  public get birthdate(): string {
    return this._birthdate;
  }
  public set birthdate(value: string) {
    this._birthdate = value;
  }
  private _dni: number;
  public get dni(): number {
    return this._dni;
  }
  public set dni(value: number) {
    this._dni = value;
  }
  private _phone: number;
  public get phone(): number {
    return this._phone;
  }
  public set phone(value: number) {
    this._phone = value;
  }

  private _profileUrl: string;
  public get profileUrl(): string {
    return this._profileUrl;
  }
  public set profileUrl(value: string) {
    this._profileUrl = value;
  }

  constructor(id: string, birthdate: string, dni: number, firstname: string, lastname: string, phone: number, speciality: string, prepaid: string[], rating: number) {
    this._id = id;
    this._birthdate = birthdate;
    this._dni = dni;
    this._firstname = firstname;
    this._lastname = lastname;
    this._phone = phone;
    this._speciality = speciality;
    this._prepaid = prepaid;
    this._rating = rating;
  }
}



// person:
// birthDate: "01-12-1996"
// dni: 40234234
// firstName: "Juan Pablo"
// lastName: "Pardal"
// phone: 2214765185
// __v: 0
// _id: "5da776e8a49566349022bdb2"
// __proto__: Object
// speciality: "Traumatologo"
