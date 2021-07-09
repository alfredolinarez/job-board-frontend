import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../providers/auth";

const UnauthenticatedRoute = (props) => {
  const auth = useAuth();

  return auth.user ? <Redirect to="/" /> : <Route {...props} />;
};

export default UnauthenticatedRoute;
