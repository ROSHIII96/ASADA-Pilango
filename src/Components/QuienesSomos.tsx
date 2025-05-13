// src/Pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom"; // Para navegación
import Carousel from "../Components/Carousel";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white text-gray-800 font-sans">
      {/* Botón "Quiénes somos" */}
      <Link
        to="/quienes-somos"
        className="absolute top-4 left-4 bg-sky-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
      >
        Quiénes somos
      </Link>

      {/* Encabezado */}
      <header className="text-center py-10 bg-sky-700 text-white shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          ASADA PILANGOSTA
        </h1>
        <p className="text-lg mt-2 font-light">Comprometidos con tu bienestar hídrico</p>
      </header>

      {/* Carrusel */}
      <section className="mt-8 mb-12 px-4">
        <Carousel />
      </section>

      {/* Footer */}
      <footer className="bg-sky-800 text-white py-6 px-4 text-center">
        <p className="text-sm mb-2">© 2025 ASADA Pilangosta. Todos los derechos reservados.</p>
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
