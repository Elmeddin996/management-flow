import { EUserRoles } from "./enums"

export interface IRegisterUser{
    firstName:string;
    lastName:string;
    age:number;
    email:string;
    phoneNumber:string;
    password:string;
    roles:EUserRoles[];
}

export interface ILogin{
    email:string;
    password:string;
}

export interface UserLogoutData {
    firstName: string,
    lastName: string,
    email: string
  }

export interface IUserInfo{
    firstName:string;
    lastName:string;
    age:number;
    email:string;
    password:string;
    roles:EUserRoles[];
}