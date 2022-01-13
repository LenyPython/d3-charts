import {JSONLogin, COMMAND, LoginCredentials, wsRequest} from '../types/'

export class LoginCommand implements JSONLogin {
  command = COMMAND.login
  arguments: LoginCredentials
  constructor(userId: string, password: string, appName?: string){
  this.arguments = {
    userId,
    password,
    appName
    }
  }
}

export class Disconnect implements wsRequest {
  command = COMMAND.logout
}
