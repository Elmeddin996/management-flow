import React from "react";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

export const useAuthentication =()=>React.useContext(AuthContext);
export const useUserContext =()=>React.useContext(UserContext);