import { ECurrency, EPositions, EUserRoles } from "./enums"

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

export interface IUserLogoutData {
    firstName: string,
    lastName: string,
    email: string
  }

export interface IUserData{
    id: string;
    firstName:string;
    lastName:string;
    age:number;
    position:EPositions;
    salary:number;
    currency:ECurrency;
}