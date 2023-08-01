import { IUserData } from "../../models";
import { HttpClient } from "../HTTPClients";

export class UserService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getUserList() {
    return await this.get(`users`);
  }

  async updateUserData(id: any, body: IUserData) {
    return await this.put(`users`, id, body);
  }
}
