import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LogoASADA from "../Fotos/Logo de ASADA Pilangosta.jpg";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userRole =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const userEmail =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    //Cuando se cierra sesión, manda a la pagina home
    logout();
    navigate({ to: "/" });
  };

  // Clase común para botones azul oscuro con texto blanco
  const buttonClass =
    "px-4 py-2 rounded-full shadow font-semibold text-white transition-colors duration-300 bg-blue-600 hover:bg-blue-700";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 shadow-md transition-colors duration-300 ${
        scrolled ? "bg-blue-700" : "bg-blue-600"
      }`}
    >
      <Link to="/">
        <img
          src={LogoASADA}
          alt="Logo ASADA Pilangosta"
          className="h-10 w-auto rounded-full"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className={buttonClass}>
          Inicio
        </Link>

        <Link to="/quienes-somos" className={buttonClass}>
          Quienes somos
        </Link>

        {user?.role === "Fontanero" && ( //Se muestra al fontanero
          <>
            <Link
              to="/reportes"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold transition duration-300"
            >
              Reportar Avería
            </Link>
            <Link to="/listareportes" className={buttonClass}>
              Reportes
            </Link>
          </>
        )}

        {user?.role === "Admin" && ( //Se muestra al admin
          <>
            <Link to="/listareportes" className={buttonClass}>
              Reportes
            </Link>
            <Link to="/abonados" className={buttonClass}>
              Abonados
            </Link>
          </>
        )}

        {user?.role === "Gestor de cobro" && ( //Se muestra al admin
          <>
            <Link to="/abonados" className={buttonClass}>
              Abonados
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link
            to="/reportes"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold transition duration-300"
          >
            Reportar Avería
          </Link>
        )}

        <Link to="/contactanos" className={buttonClass}>
          Contáctanos
        </Link>
      </div>

      <div className="flex items-center gap-4 relative">
        {!isAuthenticated ? (
          <Link to="/login" className={buttonClass}>
            Iniciar sesión
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`${buttonClass} flex items-center gap-2`}
            >
              <span className="font-medium">{userRole} </span>
              <span className="font-medium">{user?.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-50 animate-fade-in">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Nombre: {user?.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">Role: {userRole}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Correo: {userEmail}
                </p>
                <p className="text-sm text-gray-600 mb-4">Contraseña:</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
