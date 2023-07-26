import React from "react";
import { UseMutateAsyncFunction, useMutation } from "react-query";
import { useService } from "../APIs/Services";
import { ILogin } from "../models";
import { AxiosResponse } from "axios";

interface IAuthContext {
  mutateLoginApplication: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    ILogin,
    unknown
  >;
  isLoadingLogin: boolean;
}

export const AuthContext = React.createContext<IAuthContext>(null as any);

export const AuthProvider: React.FC<any> = ({ children }: any) => {
  const { authService } = useService();

  const { mutateAsync: mutateLoginApplication, isLoading: isLoadingLogin } =
    useMutation((RequestBody: ILogin) => authService.login(RequestBody),{
      onError:(err)=>alert("xeta bash verdi")
    });
  return (
    <AuthContext.Provider value={{ mutateLoginApplication, isLoadingLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
