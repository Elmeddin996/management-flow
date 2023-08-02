import React from "react";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { IUserData } from "../../models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

export const UserCreate = () => {
  const { userService } = useService();
  const [newUserData, setNewUserData] = React.useState<IUserData>();
  const navigate = useNavigate();

  const { mutateAsync: mutateCreateUser } = useMutation(
    (createUser: IUserData) => userService.createNewUser(createUser),
    {
      onError: (err) => alert("Xeta bash verdi"),
      onSuccess: () => {
        navigate(ROUTES.USERS);
      },
    }
  );

 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  setNewUserData((prevUserData):any=> {
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
    if (newUserData) {
        mutateCreateUser(newUserData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl  required>
        <InputLabel htmlFor="firstName">Name</InputLabel>
        <Input
          name="firstName"
          placeholder="Write your name here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl  required>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          name="lastName"
          placeholder="Write your lastname here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl  required>
        <InputLabel htmlFor="age">Age</InputLabel>
        <Input
          name="age"
          placeholder="Write your age here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl  required>
        <InputLabel htmlFor="salary">Salary</InputLabel>
        <Input
          name="salary"
          placeholder="Write your age here"
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
