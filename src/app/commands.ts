import {JSONLogin, COMMAND, LoginCredentials} from '../types/'

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
