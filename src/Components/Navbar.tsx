import { Link } from "@tanstack/react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
  
    return (
        <nav className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
           {!isAuthenticated && (
              <Link
                to="/reportes"
                className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded shadow-lg transition duration-300"
              >
                Reportar Avería
              </Link>
            )}
        <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/quienes-somos" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Quienes somos</Link>
         {isAuthenticated && (
        <Link to="/listareportes" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Reportes</Link>
            )}
       {!isAuthenticated && (
            <Link to="/login" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Iniciar sesion</Link>
            )}
             {isAuthenticated && (
        <Link to="/abonados" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Abonados</Link>
            )}
      </nav>  
    );
}
export default Navbar;