import React from "react";
import { useAuthentication } from "../../hooks";
import { ILogin } from "../../models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

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
    <div>
      <input onChange={handleLoginInput} type="text" />
      <input onChange={handleLoginInput} type="text" />
      <button onClick={handleLoginSubmit}>click</button>
    </div>
  );
};
