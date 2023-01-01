import { useAuth } from "@context/AuthContext";
import { Navigate } from "react-router-dom";

interface Private {
  path: string;
  children: JSX.Element;
}

const PrivateRoute: React.FunctionComponent<Private> = ({ children, path }) => {
  const { currentUser } = useAuth()!;
  return currentUser === null ? children : <Navigate to={path} replace />;
};

export default PrivateRoute;
