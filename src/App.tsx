import { AuthProvider } from "@context/AuthContext";
import Forget from "@pages/Forget/Forget";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import SingUp from "@pages/SingUp/SingUp";
import Update from "@pages/Update/Update";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute path="/login">
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute path="/">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/singup"
            element={
              <PublicRoute path="/">
                <SingUp />
              </PublicRoute>
            }
          />
          <Route
            path="/forget-password"
            element={
              <PublicRoute path="/">
                <Forget />
              </PublicRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRoute path="/login">
                <Update />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
