import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "@tanstack/react-router";

export default function PrivateRoute({ children, redirectTo = "/", usuarioPermitido }) {
  const { user } = useContext(AuthContext);

 // Si no hay usuario, redirige
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // Si usuarioPermitido está definido, verifica el rol o nombre
  if (usuarioPermitido) {
    // Permite array o string
    const permitidos = Array.isArray(usuarioPermitido) ? usuarioPermitido : [usuarioPermitido];
    // Cambia user.role por user.name si quieres validar por nombre
    if (!permitidos.includes(user.role)) {
      return <Navigate to={redirectTo} />;
    }
  }
  return children;
}