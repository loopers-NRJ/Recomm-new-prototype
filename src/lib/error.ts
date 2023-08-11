export class ServerError extends Error {
  constructor(
    message: string,
    public status = 500
  ) {
    const errorObject = { error: message };
    super(JSON.stringify(errorObject));
  }
}
