import { Link } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
//importado para el efecto de scroll
import { useEffect, useState } from "react";


const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    // Efecto para cambiar el estado de scrolled al hacer scroll, necesario para que
    // el navbar se haga un poco transparente al bajar en la pagina
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
        //En className esta para que el navbar se quede fijo siempre en la parte superior
        <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 shadow-md transition-colors duration-300 ${
            // Cambia el color de fondo al hacer scroll  
            scrolled
                    ? "bg-gray-100/70 backdrop-blur-sm"
                    : "bg-gray-100"
            }`}>
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
                {isAuthenticated && (  //Se usa para validar que el usuario este logueado 
                    <Link
                        to="/listareportes"
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                        Reportes
                    </Link>
                )}
                {isAuthenticated && ( //Se usa para validar que el usuario este logueado
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
                {!isAuthenticated && ( //Se usa para validar que el usuario este logueado
                    <Link
                        to="/reportes"
                        className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded shadow-lg font-semibold transition duration-300"
                    >
                        Reportar Avería
                    </Link>
                )}
                {!isAuthenticated && ( //Se usa para validar que el usuario este logueado
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