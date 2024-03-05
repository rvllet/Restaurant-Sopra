export interface IComment {

  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export class User {

  id: string;
  username: string;
  password: string;
  email: string;
  role: string;

  constructor(oneUser: IComment) {

    this.id = oneUser.id;
    this.username = oneUser.username;
    this.password = oneUser.password;
    this.email = oneUser.email;
    this.role = oneUser.role;
  }

}
