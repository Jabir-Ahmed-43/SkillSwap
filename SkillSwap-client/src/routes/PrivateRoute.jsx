import { Navigate, useLocation } from "react-router";
import { BounceLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  //   const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BounceLoader color="#4f39f6" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname + location.search }}
      replace
    ></Navigate>
  );
};

export default PrivateRoute;
