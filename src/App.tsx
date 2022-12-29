import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forget from "./components/Forget/Forget";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SingUp from "./components/SingUp/SingUp";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Route/PrivateRoute";
import PublicRoute from "./Route/PublicRoute";

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
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
