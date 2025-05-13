// src/Pages/HomePage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Carousel from "../Components/Carousel";
import Proyectos from "../Components/Proyectos";

const HomePage = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [showCredentials, setShowCredentials] = useState(false);
  const [showAbonadosMenu, setShowAbonadosMenu] = useState(false);

  const toggleCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  const passwordToAsterisks = (password: string) => {
    return "*".repeat(password.length);
  };

  const toggleAbonadosMenu = () => {
    setShowAbonadosMenu(!showAbonadosMenu);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-orange-300 text-gray-800 font-sans">
      {/* Franja superior */}
      <div className="fixed top-0 left-0 w-full bg-blue-500 z-10 py-2 px-4 shadow-md">
        <div className="flex justify-between items-center">
          {/* Enlaces a la izquierda */}
          <div className="flex gap-2">
            <Link
              to="/quienes-somos"
              className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-lg transition duration-300"
            >
              Quiénes somos
            </Link>

            {!isAuthenticated && (
              <Link
                to="/reportes"
                className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded shadow-lg transition duration-300"
              >
                Reportar Avería
              </Link>
            )}

            {/* Mostrar el botón "Ver Reportes" solo si el usuario está autenticado */}
            {isAuthenticated && (
              <Link
                to="/reportes/lista"
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded shadow-lg transition duration-300"
              >
                Ver Reportes
              </Link>
            )}
          </div>

          {/* Sesión / usuario */}
          <div className="flex gap-4 items-center">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-lg transition duration-300"
              >
                Iniciar sesión
              </Link>
            ) : (
              <div className="flex gap-4 items-center">
                {/* Botón ABONADOS con submenú */}
                <div className="relative">
                  <button
                    onClick={toggleAbonadosMenu}
                    className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
                  >
                    <span>ABONADOS</span>
                    <svg
                      className={`transform transition-transform duration-300 ${showAbonadosMenu ? "rotate-180" : "rotate-0"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 5.5l6 6 6-6" />
                    </svg>
                  </button>

                  {showAbonadosMenu && (
                    <div className="absolute left-0 bg-indigo-600 text-white border border-indigo-800 rounded-lg shadow-xl mt-2 p-2 w-48 z-20">
                      <Link
                        to="/abonados"
                        className="block px-4 py-2 hover:bg-indigo-500 rounded-lg transition duration-300"
                      >
                        Lista de Abonados
                      </Link>
                      <Link
                        to="/abonados/agregar"
                        className="block px-4 py-2 hover:bg-indigo-500 rounded-lg transition duration-300 mt-1"
                      >
                        Añadir Abonado
                      </Link>
                      <Link
                        to="/abonados/editar/1"
                        className="block px-4 py-2 hover:bg-indigo-500 rounded-lg transition duration-300 mt-1"
                      >
                        Editar Abonado
                      </Link>
                      <Link
                        to="/abonados/eliminar/1"
                        className="block px-4 py-2 hover:bg-indigo-500 rounded-lg transition duration-300 mt-1"
                      >
                        Eliminar Abonado
                      </Link>
                    </div>
                  )}
                </div>

                <span
                  onClick={toggleCredentials}
                  title={user?.email}
                  className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-lg cursor-pointer transition duration-300"
                >
                  {user?.name || "ADMIN"}
                </span>

                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-lg transition duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Credenciales */}
      {showCredentials && user && (
        <div className="absolute top-20 right-4 bg-white p-4 border rounded-lg shadow-lg max-w-xs z-10">
          <h3 className="text-xl font-semibold">Credenciales</h3>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Contraseña:</strong> {passwordToAsterisks(user.password)}</p>
        </div>
      )}

      {/* Bienvenida */}
      <header className="text-center py-12 bg-blue-500 text-white shadow-md mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          ¡Bienvenidos a la página oficial de ASADA Pilangosta!
        </h2>
        <p className="text-lg mt-2 font-light italic">
          Comprometidos con tu bienestar hídrico
        </p>
      </header>

      {/* Carrusel */}
      <section className="mt-12 mb-16 px-4">
        <Carousel />
      </section>

      {/* Proyectos */}
      <Proyectos />

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 px-4 text-center">
        <p className="text-sm mb-2">
          © 2025 ASADA Pilangosta. Todos los derechos reservados.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="mailto:asada@correo.com" className="hover:underline">asada@correo.com</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;