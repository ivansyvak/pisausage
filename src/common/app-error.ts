export class AppError extends Error {
  constructor(public code: number, public message: string) {
    super();    
  }

  public toString() {
    return `Error: ${this.code} ${this.message}`;
  }
}
