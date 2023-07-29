import React from "react";
import "./style.css"
import { useUserContext } from "../../hooks";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const Applications: React.FC = () => {
  const { userList } = useUserContext();

  return (
    <>
      <h1>User List</h1>
      {userList ? (
        userList.map((item, idx: number) => (
          <Card
          key={idx}
          >
            <CardContent className="user-card">
              <Typography
              variant="h4"
              >
              {"Full Name:  "}  {item.firstName }  {" "} {item.lastName}
              </Typography>
              <Typography
              variant="h6"
              >
              {"Role: "} {item.roles}
              </Typography>
              <Typography
              variant="h6"
              >
              {"Age: "} {item.age}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
