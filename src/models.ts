import { ECurrency, EPositions} from "./enums"


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
    _id: string;
    firstName:string;
    lastName:string;
    age:number;
    position:EPositions;
    salary:number;
    currency:ECurrency;
}