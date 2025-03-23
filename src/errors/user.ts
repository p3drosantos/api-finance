export class EmailAlReadyExistsError extends Error {
  constructor() {
    super(`Email already exists`);
    this.name = "EmailAlReadyExistsError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super(`User not found`);
    this.name = "UserNotFoundError";
  }
}
