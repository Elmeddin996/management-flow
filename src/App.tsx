import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes/consts";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./app/Auth/Login";
import { UserProvider } from "./context/UserContext";
import { Applications } from "./app/Applications";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
              <UserProvider>
                <Applications />
              </UserProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
