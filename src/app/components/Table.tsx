import React, { ChangeEvent} from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TabletableBody from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";
import { IUserData } from "../../models";
import {useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { ECurrency, EPositions } from '../../enums';

interface ITable {
  tableBody: IUserData[];
}

export const GlobalTable: React.FC<ITable> = ({ tableBody }) => {
  
  const { userService } = useService();
  const [updateUserId, setUpdateUserId] = React.useState("");
  const [inputOpen, setInputOpen]= React.useState(true)
  const [editedData,setEditedData] = React.useState<IUserData>(
   {
    id:"",
    firstName:"",
    lastName:"",
    age:0,
    position:EPositions.JUNIOR,
    salary:0,
    currency:ECurrency.AZN

   }
  );

  const { mutateAsync: mutateUpdateUser } = useMutation(
    (updatedUser: IUserData) => userService.updateUserData(updatedUser, updateUserId),
    {
      onError: (err) => alert("Xeta bash verdi"),
    }
  );

  const handleUserEdit = (id:string) => {
    // mutateUpdateUser()
    
    setUpdateUserId(id);
    setInputOpen(!inputOpen)
  };


  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setEditedData({...editedData,[name]:value})
    console.log(editedData);
    
    

  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TabletableBody>
            <TableCell>Ad</TableCell>
            <TableCell align="right">Soyad</TableCell>
            <TableCell align="right">Yash</TableCell>
            <TableCell align="right">Vezife</TableCell>
            <TableCell align="right">Maash</TableCell>
          </TabletableBody>
        </TableHead>
        <TableBody>
          {tableBody?.map((tableBody) => (
              <>
              {inputOpen?
                <TabletableBody
                key={tableBody.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tableBody.firstName}
                </TableCell>
                <TableCell align="right">{tableBody.lastName}</TableCell>
                <TableCell align="right">{tableBody.age}</TableCell>
                <TableCell align="right">{tableBody.position}</TableCell>
                <TableCell align="right">
                  {tableBody.salary} {tableBody.currency}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleUserEdit(tableBody.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button>Delete</Button>
                </TableCell>
              </TabletableBody>
               :
               <TabletableBody
                key={tableBody.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Input name="firstName" onChange={handleChange} defaultValue={tableBody.firstName}/>
                <Input name="lastName"  onChange={handleChange} defaultValue={tableBody.lastName}/>
                <Input name="age"  onChange={handleChange}   defaultValue={tableBody.age}/>
                <Input name="position"  onChange={handleChange}  defaultValue={tableBody.position}/>
                <Input name="salary"  onChange={handleChange}  defaultValue={tableBody.salary + tableBody.currency}/>
                <TableCell align="right">
                  <Button
                    onClick={(event) => {
                      handleUserEdit(tableBody.id);
                    }}
                  >
                    Submit
                  </Button>
                  <Button>Delete</Button>
                </TableCell>
              </TabletableBody> }
              </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
