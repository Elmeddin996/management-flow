import * as React from "react";
import FormControl from "@mui/base/FormControl";
import Input from "@mui/base/Input";
import { useUserContext } from "../../hooks";
import { useService } from "../../APIs/Services";
import { useMutation } from "react-query";
import { IUserData } from "../../models";
import { Button, FormHelperText, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

export const UserEdit = () => {
  const { id } = useParams();
  const { userList } = useUserContext();
  const { userService } = useService();
  const [newUserData, setNewUserData] = React.useState<IUserData>();
  const navigate = useNavigate();

  console.log(userList?.find((item) => item._id === id));
  
  React.useEffect(() => {
    setNewUserData(userList?.find((item) => item._id === id));
  }, [userList, id]);
  
  console.log(newUserData);
  const { mutateAsync: mutateUpdateUser } = useMutation(
    (updatedUser: IUserData) => userService.updateUserData(id, updatedUser),
    {
      onError: (err) => alert("Xeta bash verdi"),
      onSuccess: (data) => {
        setNewUserData(data.config.data);
        navigate(ROUTES.USERS);
      },
    }
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewUserData((prevFormData) => {
      if (prevFormData) {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
      return prevFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserData) {
      mutateUpdateUser(newUserData);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <FormControl value={newUserData ? newUserData.firstName : ""} required>
        <InputLabel htmlFor="firstName">Name</InputLabel>
        <Input
          name="firstName"
          placeholder="Write your name here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl value={newUserData ? newUserData.lastName : ""} required>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          name="lastName"
          placeholder="Write your lastname here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl value={newUserData ? newUserData.age : ""} required>
        <InputLabel htmlFor="age">Age</InputLabel>
        <Input
          name="age"
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
