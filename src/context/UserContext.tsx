import React from "react";
import { UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { useService } from "../APIs/Services";
import { IUserInfo, UserLogoutData } from "../models";
import { QueryKeys } from "../enums";

interface IUserContext {
  mutateLogOutUser: UseMutateAsyncFunction<
    void,
    unknown,
    UserLogoutData,
    unknown
  >;
  userList: IUserInfo[];
}

export const UserContext = React.createContext<IUserContext>(null as any);

export const UserProvider: React.FC<any> = ({ children }: any) => {
  const { userService, authService } = useService();

  const { data: userList } = useQuery([QueryKeys.GETUSERLIST], () =>
    userService.getUserList()
  );

  const { mutateAsync: mutateLogOutUser } = useMutation(
    (RequestBody: UserLogoutData) => authService.logout(RequestBody),
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
