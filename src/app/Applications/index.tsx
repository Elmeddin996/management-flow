import React from "react";
import "./style.css";
import { useUserContext } from "../../hooks";
import { Button } from "@mui/material";
import { IUserLogoutData } from "../../models";
import { ROUTES } from "../../routes/consts";
import { useNavigate } from "react-router-dom";
import { GlobalTable } from "../components/Table";

export const Applications: React.FC = () => {
  const { userList, mutateLogOutUser } = useUserContext();
  const [user, setUser] = React.useState<IUserLogoutData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      const parsedUserData: IUserLogoutData = JSON.parse(storedUserData);
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
      <GlobalTable tableBody={userList} />
    </div>
  );
};
