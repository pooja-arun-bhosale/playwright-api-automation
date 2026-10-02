export class AuthClient {
  constructor(request) {
    this.request = request;
  }

  async createToken(username, password) {
    return await this.request.post("/auth", {
      data: {
        username,
        password,
      },
    });
  }
}
