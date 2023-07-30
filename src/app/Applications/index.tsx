import React from "react";
import "./style.css";
import { useUserContext } from "../../hooks";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { UserLogoutData } from "../../models";
import { ROUTES } from "../../routes/consts";
import { useNavigate } from "react-router-dom";

export const Applications: React.FC = () => {
  const { userList, mutateLogOutUser } = useUserContext();
  const [user, setUser] = React.useState<UserLogoutData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      const parsedUserData: UserLogoutData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  }, []);

  const handleLogOutUser = React.useCallback(() => {
    mutateLogOutUser(user)
      .then(() => {
        navigate(ROUTES.AUTH.LOGIN);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, mutateLogOutUser, navigate]);
  return (
    <div>
      <div className="user-page-header">
        <h1>User List</h1>
        <Button variant="outlined" onClick={handleLogOutUser}>
          Log Out
        </Button>
      </div>
      {userList ? (
        userList.map((item, idx: number) => (
          <Card key={idx}>
            <CardContent className="user-card">
              <Typography variant="h4">
                {"Full Name:  "} {item.firstName} {item.lastName}
              </Typography>
              <Typography variant="h6">
                {"Role: "} {item.roles}
              </Typography>
              <Typography variant="h6">
                {"Age: "} {item.age}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
