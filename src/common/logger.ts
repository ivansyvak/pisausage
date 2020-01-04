class Logger {
  log(msg: any) {
    console.log(msg.toString());
  }
}

export const logger = new Logger();
