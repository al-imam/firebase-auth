import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SingUp from "./components/SingUp/SingUp";

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
