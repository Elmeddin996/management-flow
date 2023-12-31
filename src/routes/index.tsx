import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./consts";
import { AuthProvider } from "../context/AuthContext";
import { Login } from "../app/Auth/Login";
import { UserProvider } from "../context/UserContext";
import { Applications } from "../app/Applications";
import { ErrorPage } from "../app/components/ErrorPage";
import { ProtectedRouter } from "../app/components/ProtectedRouter";
import { UserEdit } from "../app/components/UserEdit";
import { UserCreate } from "../app/components/UserCreate";
import { AdminRegister } from "../app/Auth/Register";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        }
      />
      <Route
        path={ROUTES.USERS}
        element={
          <ProtectedRouter>
            <UserProvider>
              <Applications />
            </UserProvider>
          </ProtectedRouter>
        }
      />

      <Route
        path={"/edit/:id"}
        element={
          <ProtectedRouter>
            <UserProvider>
              <UserEdit />
            </UserProvider>
          </ProtectedRouter>
        }
      />

      <Route
        path={"/adduser"}
        element={
          <ProtectedRouter>
            <UserProvider>
              <UserCreate />
            </UserProvider>
          </ProtectedRouter>
        }
      />

      <Route
        path={"/signup"}
        element={
          <AuthProvider>
            <AdminRegister />
          </AuthProvider>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
