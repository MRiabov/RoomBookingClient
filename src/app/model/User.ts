export class User {

  name: string;

  id: number;

  constructor(id: number, name: string) {
    this.name = name;
    this.id = id;
  }

  static mapToUser(user: User): User {
    return new User(user.id, user.name);
  }
}
