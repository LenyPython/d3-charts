// Define a type for the slice state
export interface LoggerInterface {
  Logs: Log[]
}
export interface Log {
  class: LOG
  msg: string
}
export enum LOG {
  error = 'error',
  info = 'info',
  warning = 'warning',
  succes = 'succes',
}
