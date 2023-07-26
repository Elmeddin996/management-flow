import React from "react";
import {useQuery } from "react-query";
import { useService } from "../APIs/Services";
import { IUserInfo } from "../models";

interface IUserContext {
    userList: IUserInfo[];
}

export const UserContext = React.createContext<IUserContext>(null as any);

export const UserProvider: React.FC<any> = ({ children }:any) => {
  const { userService } = useService();

  const{data:userList}=useQuery(["getUserList"],()=>
  userService.getUserList()
  );
  return (
    <UserContext.Provider value={{userList:userList?.data}}>
      {children}
    </UserContext.Provider>
  );
};
