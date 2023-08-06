import React from "react";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { ILogin} from "../../models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@mui/material";

export const AdminRegister = () => {
  const { authService } = useService();
  const [newAdminData, setNewAdminData] = React.useState<ILogin>();
  const navigate = useNavigate();

  const { mutateAsync: mutateCreateUser } = useMutation(
    (createUser: ILogin) => authService.createNewAdmin(createUser),
    {
      onError: (err) => alert("Xeta bash verdi"),
      onSuccess: () => {
        navigate(ROUTES.AUTH.LOGIN);
      },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdminData((prevUserData): any => {
      if (!prevUserData) {
        return { [name]: value };
      }
      return {
        ...prevUserData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminData) {
      mutateCreateUser(newAdminData);
    }
  };

  return (
      <form className="form-box" onSubmit={handleSubmit}>
        <FormControl required>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            name="email"
            type="email"
            placeholder="Write your email here"
            onChange={handleInputChange}
          />
          <FormHelperText />
        </FormControl>
        <FormControl required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            placeholder="Write your password here"
            type="password"
            onChange={handleInputChange}
          />
          <FormHelperText />
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
  );
};
