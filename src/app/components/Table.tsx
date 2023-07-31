import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TabletableBody from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { IUserData } from "../../models";
import {useMutation } from "react-query";
import { useService } from "../../APIs/Services";

interface ITable {
  tableBody: IUserData[];
}

export const GlobalTable: React.FC<ITable> = ({ tableBody }) => {
  const { userService } = useService();
  const [updateUserId, setUpdateUserId] = React.useState("");

  const { mutateAsync: mutateUpdateUser } = useMutation(
    (updatedUser: IUserData) => userService.updateUserData(updatedUser, updateUserId),
    {
      onError: (err) => alert("Xeta bash verdi"),
    }
  );

  const handleUserEdit = (body:IUserData) => {
    
    mutateUpdateUser(body)
    setUpdateUserId(body.id);
    return(
      <div>
        <input value={body.firstName}/>
        <input value={body.lastName}/>
        <input value={body.age}/>
        <input value={body.salary}/>
        <button>Submit</button>
      </div>
    )
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
          {tableBody &&
            tableBody.map((tableBody) => (
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
                      handleUserEdit(tableBody);
                    }}
                  >
                    Edit
                  </Button>
                  <Button>Delete</Button>
                </TableCell>
              </TabletableBody>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
