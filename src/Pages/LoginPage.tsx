// filepath: c:\Users\Rochi\Desktop\Proyecto\ASADA-Pilangosta\src\Pages\LoginPage.tsx
//import { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
import Login from "../Components/Login";

const LoginPage = () => {
  /*const { logout, user } = useAuth();
 // const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    //navigate("/login");
  };*/

  return (
    <div className="pt-16"> {/* Ajusta pt-16 según la altura de tu navbar */}
    <Login />
    </div>
  );
};

export default LoginPage;