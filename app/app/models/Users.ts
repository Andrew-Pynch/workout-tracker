export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  userName: string;

  constructor(
    _id: number,
    _firstName: string,
    _lastName: string,
    _age: number,
    _email: string,
    _userName: string
  ) {
    this.id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.age = _age;
    this.email = _email;
    this.userName = _userName;
  }
}
