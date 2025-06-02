import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "@tanstack/react-router";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children;
}