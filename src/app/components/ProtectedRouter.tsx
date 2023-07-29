import React from 'react'
import { ROUTES } from '../../routes/consts';
import { Navigate } from 'react-router-dom';

interface IProps{
}

export const ProtectedRouter:React.FC<IProps> = ({children}:any) => {
 
  const isUserLoginned = localStorage.getItem("token");

  if (isUserLoginned) {
    return <>{children}</>
  }

  return  <Navigate to={ROUTES.AUTH.LOGIN}/>

}
