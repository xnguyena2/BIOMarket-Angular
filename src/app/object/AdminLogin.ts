

export interface UserInfo {
  username: string;
  password: string;
}

export interface UserEntity{
  createat: string;
  createby: string;
  roles: string[];
  username: string;
}

export class UserDetail {
  name: string;
  roles: string[];

  constructor(response: any) {
    this.name = response.name;
    this.roles = response.roles;
  }

  public getRole(): string {
    if (this.roles === null || this.roles === undefined)
      return 'undefined';
    return this.roles[0];
  }
}
