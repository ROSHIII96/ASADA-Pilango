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
          <div className="flex gap-2">

          </div>

          <div className="flex gap-4 items-center">
           
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

           {/* Noticias */}
<section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 mt-16 shadow-inner rounded-xl max-w-5xl mx-auto">
  <h3 className="text-3xl font-bold text-center text-blue-800 mb-10 underline underline-offset-8 decoration-blue-500">
    Noticias y Novedades
  </h3>
  <div className="grid gap-8 md:grid-cols-2">
    <div className="bg-white border-l-8 border-blue-500 p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
      <h4 className="text-xl font-semibold text-blue-700 mb-2">
        🔧 Mantenimiento Programado
      </h4>
      <p className="text-gray-700">
        El próximo <strong>jueves 15 de mayo</strong> realizaremos un mantenimiento programado
        en el suministro de agua que afectará temporalmente a varias zonas de Pilangosta.
        Agradecemos su comprensión.
      </p>
    </div>
    <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
      <h4 className="text-xl font-semibold text-green-700 mb-2">
        🚰 Proyecto de Expansión
      </h4>
      <p className="text-gray-700">
        Iniciamos un nuevo proyecto de expansión para mejorar la cobertura de agua potable
        en zonas rurales. Muy pronto compartiremos los avances y zonas beneficiadas.
      </p>
    </div>
  </div>
</section>

      {/* Proyectos */}
      <section className="mt-16 px-4">
        <Proyectos />
      </section>

            {/* Comentarios de Abonados */}
<section className="bg-white py-16 px-6 mt-20 max-w-6xl mx-auto rounded-xl shadow-xl border border-blue-200">
  <h3 className="text-3xl font-bold text-center text-blue-800 mb-12 underline underline-offset-8 decoration-blue-500">
    ¿Qué dicen nuestros abonados?
  </h3>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "El servicio ha mejorado muchísimo en los últimos años. Siempre están atentos a cualquier problema."
      </p>
      <p className="text-blue-800 font-semibold">– Laura G., Pilangosta Centro</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "Muy agradecido por el acceso constante al agua potable. Excelente trabajo por parte de la ASADA."
      </p>
      <p className="text-blue-800 font-semibold">– Marcos R., Barrio Los Pinos</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "Me encanta que ahora podamos reportar averías fácilmente desde la web. ¡Gran avance!"
      </p>
      <p className="text-blue-800 font-semibold">– Erika M., Calle Las Rosas</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "La comunicación con la ASADA ha sido clara y eficiente. Me siento escuchado como abonado."
      </p>
      <p className="text-blue-800 font-semibold">– Luis A., Pilangosta Norte</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "Desde que se hicieron las mejoras, no hemos tenido cortes inesperados. ¡Gracias ASADA!"
      </p>
      <p className="text-blue-800 font-semibold">– Karla V., Zona Alta</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
      <p className="text-gray-800 italic mb-4">
        "El nuevo sistema de registro de abonados ha facilitado muchos trámites. ¡Muy profesional!"
      </p>
      <p className="text-blue-800 font-semibold">– Don Alfredo C., Pilangosta Sur</p>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-blue-700 text-white py-6 px-4 text-center">
  <p className="text-sm mb-2">
    © 2025 ASADA Pilangosta. Todos los derechos reservados.
  </p>
  <div className="flex justify-center gap-6 text-sm">
    <a href="https://www.facebook.com/asada.pilangosta.9/" className="hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href="https://wa.me/50664568177" className="hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href="mailto:asada@correo.com" className="hover:underline">asada@correo.com</a>
  </div>
</footer>

    </div>
  );
};

export default HomePage;
