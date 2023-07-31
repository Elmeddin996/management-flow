import { ILogin, IRegisterUser, IUserLogoutData } from "../../models";
import { HttpClient } from "../HTTPClients";

export class AuthService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async register(body: IRegisterUser) {
    return await this.post(`register`, body);
  }

  async login(body: ILogin) {
    return await this.post(`login`, body).then(({ data }) =>{
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    });
  }

  async logout(body: IUserLogoutData) {
    return await this.post(`logout`, body).then(()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    })
  }
}
 