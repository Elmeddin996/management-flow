import React from 'react'
import { useUserContext } from '../../hooks'

export const Applications:React.FC = () => {
    const {userList}=useUserContext();
  return (
    <>
        <h1>User List</h1>
        {userList.map((item, idx:number)=>(
            <h1 key={idx}>{item.firstName}</h1>
        ))}
    </>
  )
}
