import Carousel from "../Components/Carousel";
import Proyectos from "../Components/Proyectos";
import { FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-400 to-green-400 text-gray-100 font-sans">
      {/* Contenedor general */}
      <div className="pt-14">
        {/* Bienvenida */}
        <header className="text-center py-16 bg-blue-700 text-white rounded-xl shadow-lg max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            ¡Bienvenidos a la página oficial de ASADA Pilangosta!
          </h2>
          <p className="text-lg md:text-xl font-light italic">
            Comprometidos con tu bienestar hídrico
          </p>
        </header>

        {/* Carrusel */}
        <section className="mt-12 mb-16 px-4">
          <Carousel />
        </section>

        {/* Noticias */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 mt-16 shadow-inner rounded-xl max-w-5xl mx-auto text-gray-900">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-10 underline underline-offset-8 decoration-blue-500">
            Noticias y Novedades
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white border-l-8 border-blue-500 p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              <h4 className="text-xl font-semibold text-blue-700 mb-2">
                🔧 Mantenimiento Programado
              </h4>
              <p className="text-gray-700">
                El próximo <strong>jueves 15 de junio</strong> realizaremos un
                mantenimiento programado en el suministro de agua que afectará
                temporalmente a varias zonas de Pilangosta.
              </p>
            </div>
            <div className="bg-white border-l-8 border-green-500 p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
              <h4 className="text-xl font-semibold text-green-700 mb-2">
                🚰 Proyecto de Expansión
              </h4>
              <p className="text-gray-700">
                Iniciamos un nuevo proyecto de expansión para mejorar la
                cobertura de agua potable en zonas rurales. Muy pronto
                compartiremos los avances.
              </p>
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <section className="mt-16 px-4">
          <Proyectos />
        </section>

        {/* Comentarios de Abonados */}
        <section className="bg-white py-16 px-6 mt-20 max-w-6xl mx-auto rounded-xl shadow-xl border border-blue-200 text-gray-900">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-12 underline underline-offset-8 decoration-blue-500">
            ¿Qué dicen nuestros abonados?
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 hover:scale-105 transition-transform duration-300">
              <p className="text-gray-800 italic mb-4">
                "Me encanta que ahora podamos reportar averías fácilmente desde
                la web. ¡Gran avance!"
              </p>
              <p className="text-blue-800 font-semibold">– Erika M.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 hover:scale-105 transition-transform duration-300">
              <p className="text-gray-800 italic mb-4">
                "Desde que se hicieron las mejoras, no hemos tenido cortes
                inesperados. ¡Gracias ASADA!"
              </p>
              <p className="text-blue-800 font-semibold">– Karla V.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-400 hover:scale-105 transition-transform duration-300">
              <p className="text-gray-800 italic mb-4">
                "El nuevo sistema de registro de abonados ha facilitado muchos
                trámites."
              </p>
              <p className="text-blue-800 font-semibold">– Don Alfredo C.</p>
            </div>
          </div>
        </section>

        {/* Footer con íconos */}
        <footer className="bg-blue-800 text-white py-6 px-4 text-center mt-16 shadow-lg">
          <p className="text-sm mb-4">
            © 2025 ASADA Pilangosta. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-8 text-2xl">
            <a
              href="https://www.facebook.com/asada.pilangosta.9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://wa.me/50664568177"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:asada.pilangosta@gmail.com"
              className="hover:text-yellow-300 transition-colors"
              aria-label="Correo electrónico"
            >
              <FaEnvelope />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
