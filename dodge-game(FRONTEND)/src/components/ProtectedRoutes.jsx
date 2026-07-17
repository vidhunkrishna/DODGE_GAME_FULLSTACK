import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("jwt");
  if (!token) return <Navigate to="/" />;
  return children;
}
