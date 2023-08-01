import * as React from 'react';
import FormControl from '@mui/base/FormControl';
import Input from '@mui/base/Input';
import { useUserContext } from '../../hooks';
import { useService } from '../../APIs/Services';
import { useMutation } from 'react-query';
import { IUserData } from '../../models';
import { Button, FormHelperText, InputLabel } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';

export const UserEdit = () => {
    const { id } = useParams();
    const { userList} = useUserContext();

    const { userService } = useService();

    const [selectedItem, setSelectedItem] = React.useState<IUserData>(); 

   React.useEffect(()=>{
    const foundItem = userList?.find((item) => item.id === id);
    setSelectedItem(foundItem);
   },[userList, id])
  

  const { mutateAsync: mutateUpdateUser } = useMutation(
    (updatedUser: IUserData) => userService.updateUserData(id, updatedUser),
    {
      onError: (err) => alert("Xeta bash verdi"),
    }
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectedItem((prevFormData) => {
      if (prevFormData) {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
        mutateUpdateUser(selectedItem)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl value={selectedItem ? selectedItem.firstName :""}  required>
        <InputLabel htmlFor="firstName">Name</InputLabel>
        <Input
          name="firstName"
          placeholder="Write your name here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl value={selectedItem?selectedItem.lastName :""}  required>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          name="lastName"
          placeholder="Write your lastname here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <FormControl value={selectedItem?selectedItem.age:""} required>
        <InputLabel htmlFor="age">Age</InputLabel>
        <Input
          name="age"
          placeholder="Write your age here"
          onChange={handleInputChange}
        />
        <FormHelperText />
      </FormControl>
      <Link to={ROUTES.USERS}>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      </Link>
    </form>
  );
}
