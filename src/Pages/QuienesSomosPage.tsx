// src/Pages/QuienesSomosPage.tsx
import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import TanqueImg from "../Fotos/Tanque.png";


const QuienesSomosPage = () => {
  return (
    <div
      className="min-h-screen text-gray-800 font-sans"
      style={{
        backgroundImage: `url(${TanqueImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="group px-6 md:px-16 py-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl max-w-5xl mx-auto shadow-lg border-t-8 border-blue-700 cursor-pointer select-none">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            ¿Quiénes somos?
          </h1>
        </div>

        <div className="max-h-0 overflow-hidden group-hover:max-h-[1000px] transition-all duration-700 ease-in-out">
          <p className="text-lg leading-relaxed text-blue-100 max-w-4xl mx-auto mt-8 text-center select-text">
            Somos una organización comunal sin fines de lucro dedicada a garantizar el acceso al agua potable en Pilangosta, resultado del esfuerzo colectivo de vecinos comprometidos con una gestión eficiente, sostenible y transparente.
            <br /><br />
            Nuestro objetivo es asegurar un suministro continuo y de calidad, promoviendo el cuidado ambiental y la participación ciudadana. A lo largo del tiempo, hemos avanzado con nuevas tecnologías, capacitaciones y proyectos de reforestación para proteger nuestras fuentes de agua.
            <br /><br />
            Más que una administración, somos una comunidad unida por el bienestar común y el trabajo conjunto.
          </p>
        </div>
      </section>

      {/* Mision, Vision, Valores */}
      <section className="text-center mb-16 px-6 md:px-16 mt-20 max-w-5xl mx-auto">
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
            <ul className="text-lg text-white leading-relaxed text-left space-y-2">
              <li>Responsabilidad</li>
              <li>Solidaridad</li>
              <li>Sostenibilidad</li>
              <li>Transparencia</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ubicacion */}
      <section className="text-center mb-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Ubicación</h2>
        <div className="w-full max-w-xs mx-auto aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.773361384773!2d-85.40965372587117!3d10.035551990071625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9fa5d427ed8a1f%3A0xf4e8778ff000126!2sAsada%20De%20Pilangosta!5e0!3m2!1ses-419!2scr!4v1746990175518!5m2!1ses-419!2scr"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Footer con iconos actualizados */}
      <footer className="bg-blue-800 text-white py-6 px-4 text-center shadow-lg">
        <p className="text-sm mb-4">© 2025 ASADA Pilangosta. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-8 text-2xl">
          <a
            href="https://www.facebook.com/asadapilangosta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/50664568177"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:asada.pilangosta@gmail.com"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Correo electrónico"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default QuienesSomosPage;
