


export class LoginDTO {
    constructor(public email: string, public password: string) {}
  
    validate(): boolean {
      return this.email.includes('@') && this.password.length >= 8;
    }
  }
  