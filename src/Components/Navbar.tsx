import { Link } from "@tanstack/react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
  
    return (
        <nav className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                    Inicio
                </Link>
                <Link
                    to="/quienes-somos"
                    className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                    Quienes somos
                </Link>
                {isAuthenticated && (
                    <Link
                        to="/listareportes"
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                        Reportes
                    </Link>
                )}
                {isAuthenticated && (
                    <Link
                        to="/abonados"
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                        Abonados
                    </Link>
                )}
                <Link
                    to="/contactanos"
                    className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                    Contáctanos
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {!isAuthenticated && (
                    <Link
                        to="/reportes"
                        className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded shadow-lg font-semibold transition duration-300"
                    >
                        Reportar Avería
                    </Link>
                )}
                {!isAuthenticated && (
                    <Link
                        to="/login"
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 border border-gray-300 rounded px-3 py-1"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </nav>
    );
}
export default Navbar;