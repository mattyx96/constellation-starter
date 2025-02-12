export class User {
  email: string;
  firstName: string;
  lastName: string;
  image: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    image: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
  }
}
