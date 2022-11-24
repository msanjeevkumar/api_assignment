import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(username: string, password: string) {
    //TODO
    // 1. persist this user to the DB of your preferance
    // 2. return succes message or error message
  }

  login(username: string, password: string) {
    //TODO
    // 1. check if the user exist if so return jwt token else throw 404
  }
}
