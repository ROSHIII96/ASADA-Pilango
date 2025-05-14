// src/Pages/QuienesSomosPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const QuienesSomosPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      
      {/* Encabezado */}
      <header className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg">
          ¿Quiénes somos?
        </h1>
      </header>

      {/* Descripción */}
      <section className="text-center px-6 md:px-16 mb-16">
        <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-700">
          Somos una organización comunal sin fines de lucro que administra el sistema de acueducto en Pilangosta. Nuestro propósito es garantizar agua potable de calidad y promover una gestión responsable del recurso hídrico.
        </p>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="text-center mb-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-semibold text-white mb-4">Misión</h2>
            <p className="text-lg text-white leading-relaxed">
              Garantizar el acceso a agua potable de calidad para los habitantes de Pilangosta mediante una gestión eficiente y responsable del recurso hídrico.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-semibold text-white mb-4">Visión</h2>
            <p className="text-lg text-white leading-relaxed">
              Ser una organización modelo en la gestión sostenible del agua, trabajando con la comunidad para lograr un desarrollo integral.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-300 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-semibold text-white mb-4">Valores</h2>
            <ul className="text-lg text-white list-disc list-inside leading-relaxed text-left space-y-2">
              <li>Responsabilidad</li>
              <li>Solidaridad</li>
              <li>Sostenibilidad</li>
              <li>Transparencia</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Miembros */}
      <section className="text-center mb-20">
        <h2 className="text-3xl font-semibold text-blue-700 mb-8">Nuestros Miembros</h2>

        {/* Presidente */}
        <div className="mb-12">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/originals/9e/4b/e4/9e4be45c7fbb46b05aaee2b203a35232.jpg"
              alt="Presidente"
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-700 shadow-lg"
            />
            <p className="font-semibold text-lg">Presidente</p>
          </div>
        </div>

        {/* Fila de los demás miembros */}
        <div className="flex flex-wrap justify-center gap-10 px-6">
          {[ "Vicepresidente", "Tesorero", "Secretario", "Fontanero", "Fontanero" ].map((rol, i) => (
            <div key={i} className="text-center">
              <img
                src="https://i.pinimg.com/originals/9e/4b/e4/9e4be45c7fbb46b05aaee2b203a35232.jpg"
                alt={rol}
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-500 shadow-lg"
              />
              <p className="font-semibold text-sm">{rol}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="text-center mb-16 px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Ubicación</h2>
        <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.773361384773!2d-85.40965372587117!3d10.035551990071625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9fa5d427ed8a1f%3A0xf4e8778ff000126!2sAsada%20De%20Pilangosta!5e0!3m2!1ses-419!2scr!4v1746990175518!5m2!1ses-419!2scr"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 px-4 text-center shadow-lg">
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

export default QuienesSomosPage;

/*
{ /*Botón de Atrás
 */ /*}
      <section className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center text-white bg-blue-800 py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-colors duration-300"
        >
          <span className="mr-2">&larr;</span> Volver al Inicio
        </Link>
      </section>
*/