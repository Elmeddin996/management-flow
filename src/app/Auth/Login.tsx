import React from "react";
import "./style.css"
import { useAuthentication } from "../../hooks";
import { ILogin } from "../../models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { Box,Button } from "@mui/material";
import TextField from '@mui/material/TextField';

export const Login = () => {
  const { mutateLoginApplication, isLoadingLogin } = useAuthentication();
  const [loginInput, setLoginInput] = React.useState<ILogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginInput = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleLoginSubmit = React.useCallback(() => {
    mutateLoginApplication(loginInput)
      .then(() => {
        navigate(ROUTES.USERS);
      })
      .catch(() => console.log("xeta bash verdi"));
  }, [loginInput, mutateLoginApplication,navigate]);

  if (isLoadingLogin) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box className="login-box">
      <h1>Login Page</h1>
       <TextField
          className="login-input"
          type="email"
          name="email"
          label="Enter Email"
          onChange={handleLoginInput}
        />
        <TextField
          type="password"
          name="password"
          label="Enter Password"
          onChange={handleLoginInput}
        />
      
        <Button variant="contained" onClick={handleLoginSubmit}>Log In</Button>
    </Box>
  );
};
