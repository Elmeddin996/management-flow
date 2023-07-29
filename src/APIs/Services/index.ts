import { AuthService } from "./Auth";
import { UserService } from "./Users";

export const useService =()=>{
    const services={
        authService: new  AuthService(),
        userService: new UserService()
    };

    return services;
}