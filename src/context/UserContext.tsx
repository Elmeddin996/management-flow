import React from "react";
import { UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { useService } from "../APIs/Services";
import { IUserData, IUserLogoutData } from "../models";
import { EQueryKeys } from "../enums";

interface IUserContext {
  mutateLogOutUser: UseMutateAsyncFunction<
    void,
    unknown,
    IUserLogoutData,
    unknown
  >;
  userList:IUserData[];
  
}

export const UserContext = React.createContext<IUserContext>(null as any);

export const UserProvider: React.FC<any> = ({ children }: any) => {
  const { userService, authService } = useService();

  const { data: userList } = useQuery([EQueryKeys.GETUSERLIST], () =>
    userService.getUserList()
  );

  const { mutateAsync: mutateLogOutUser } = useMutation(
    (RequestBody: IUserLogoutData) => authService.logout(RequestBody),
    {
      onError: (err) => alert("xeta bash verdi"),
    }
  );

  return (
    <UserContext.Provider
      value={{ userList: userList?.data, mutateLogOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
