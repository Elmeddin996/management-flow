import React from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { useService } from "../APIs/Services";
import { IUserData, IUserLogoutData } from "../models";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";

interface IUserContext {
  mutateLogOutUser: UseMutateAsyncFunction<
    void,
    unknown,
    IUserLogoutData,
    unknown
  >;
  userList:IUserData[];
  refetchUsers: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>
}

export const UserContext = React.createContext<IUserContext>(null as any);

export const UserProvider: React.FC<any> = ({ children }: any) => {
  const { userService, authService } = useService();

  const { data: userList, refetch:refetchUsers } = useQuery([EQueryKeys.GETUSERLIST], () =>
    userService.getUserList(),
    
  );

  const { mutateAsync: mutateLogOutUser } = useMutation(
    (requestBody: IUserLogoutData) => authService.logout(requestBody),
    {
      onError: (err) => alert("xeta bash verdi"),
    }
  );
  return (
    <UserContext.Provider
      value={{ userList: userList?.data, mutateLogOutUser, refetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};
