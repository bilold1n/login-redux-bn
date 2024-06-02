import { Navigate } from "react-router-dom";

export default function protectdrouter({ children, user }) {
  if (user) {
    <Navigate to="/" />;
    return children;
  } else {
    return <Navigate to="/register" />;
  }
}
