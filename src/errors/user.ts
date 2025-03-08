export class EmailAlReadyExistsError extends Error {
  constructor() {
    super(`Email already exists`);
    this.name = "EmailAlReadyExistsError";
  }
}
