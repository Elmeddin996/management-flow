import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TabletableBody from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { IUserData } from "../../models";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

interface ITable {
  tableBody: IUserData[];
}

export const GlobalTable: React.FC<ITable> = ({ tableBody }) => {
  return (
    <TableContainer component={Paper}>
      <Link to={ROUTES.USERADD}>
        <Button>Create New User</Button>
      </Link>
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
                <Link to={`${ROUTES.USEREDIT}/${tableBody.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button>Delete</Button>
              </TableCell>
            </TabletableBody>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
