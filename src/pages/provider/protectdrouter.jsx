import { Navigate } from "react-router-dom";

export default function protectdrouter({ children, user }) {
  console.log(user);
  if (user) {
    <Navigate to="/" />;
    return children;
  } else {
    return <Navigate to="/register" />;
  }
}
