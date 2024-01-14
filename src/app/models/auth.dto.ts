export class AuthDTO {
    user_id: string;
    access_token: string;
    email: string;
    password: string;
  
    constructor(
      user_id: string,
      access_token: string,
      email: string,
      password: string
    ) {
      this.user_id = user_id;
      this.access_token = access_token;
      this.email = email;
      this.password = password;
    }
  }

  export class LoginResponse {
    author_name: string;
    message: string;
    status: boolean;
    token: string;

    constructor(
      author_name: string,
      message: string,
      status: boolean,
      token: string,
    ) {
      this.author_name = author_name;
      this.message = message;
      this.status = status;
      this.token = token;
    }
  }