import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SingUp from "./components/SingUp/SingUp";
import { AuthProvider } from "./Context/AuthContext";

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
