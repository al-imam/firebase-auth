import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface Private {
  path: string;
  children: JSX.Element;
}

const PrivateRoute: React.FunctionComponent<Private> = ({ children, path }) => {
  const { currentUser } = useAuth()!;
  return currentUser === null ? children : <Navigate to={path} />;
};

export default PrivateRoute;
