import { ILogin, IRegisterUser } from "../../models";
import { HttpClient } from "../HTTPClients";

export class UserService extends HttpClient{
    constructor(){
        super(`http://localhost:3001`)
    }

    async getUserList(){
        return await this.get(`users`);
    }

    async register(body:IRegisterUser){
        return await this.post(`register`, body)
    }

    async login(body:ILogin){
        return await this.post(`login`, body)
    }
}