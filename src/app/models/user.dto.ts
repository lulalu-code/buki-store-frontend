export class UserDTO {
    id?: string;
    access_token?: string;
    name:string;
    email:string;
    password:string;
    zone:string;

    constructor(
        name: string,
        email: string,
        password: string,
        zone:string
      ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.zone = zone;
      }
}

