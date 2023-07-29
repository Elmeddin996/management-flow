import { HttpClient } from "../HTTPClients";

export class UserService extends HttpClient{
    constructor(){
        super(`http://localhost:3001`)
    }

    async getUserList(){
        return await this.get(`users`);
    }
}