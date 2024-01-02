export class UserDTO {
    id?: string;
    access_token?: string;
    name:string;
    email:string;
    password:string;
    password_confirmation:string;
    zone:string;

    constructor(
        name: string,
        email: string,
        password: string,
        password_confirmation:string,
        zone:string
      ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.zone = zone;
      }
}

