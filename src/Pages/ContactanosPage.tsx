import React from "react";

const ContactanosPage = () => {
  const contactos = [
    {
      nombre: "ASADA Pilangosta",
      puesto: "Acueducto Pilangosta",
      telefono: "+506 8347 5194",
      imagen: "/fotos/Logo de ASADA Pilangosta.jpg",
    },
    {
      nombre: "Emel Rodríguez",
      puesto: "Presidente",
      telefono: "+506 8347 5194",
      imagen: "/fotos/Presidente.png",
    },
    {
      nombre: "Felix Elizondo",
      puesto: "Vicepresidente",
      telefono: "8777-7777",
      imagen: "/fotos/Vicepresidente.png",
    },
    {
      nombre: "Liliana Elizondo Hernández",
      puesto: "Gestor de Cobros (Pita Rayada)",
      telefono: "8666-6666",
      imagen: "/fotos/Gestor de cobro2.png",
    },
    {
      nombre: "Noemy Mejías Quesada",
      puesto: "Gestor de Cobros (Maravilla)",
      telefono: "8666-6666",
      imagen: "/fotos/Gestor de cobro1.jpg",
    },
    {
      nombre: "Luz Elena Vásquez Espinoza",
      puesto: "Gestor de Cobros (Pilangosta)",
      telefono: "8666-6666",
      imagen: "/fotos/Gestor de cobro3.jpg",
    },
    {
      nombre: "José Didier Navarro Calvo",
      puesto: "Fontanero (Pilangosta y Maravilla)",
      telefono: "8666-6666",
      imagen: "/fotos/Fontanero1.png",
    },
    {
      nombre: "Mauricio Elizondo Hernández",
      puesto: "Fontanero (Pita Rayada)",
      telefono: "8666-6666",
      imagen: "/fotos/Fontanero2.png",
    },
  ];

return (
  <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-center">
      <h2 className="text-3xl font-extrabold text-white">Contáctanos</h2>
      <p className="mt-4 text-lg text-white">
        Puedes comunicarte con cualquiera de nuestros representantes.
      </p>
    </div>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {contactos.map((persona, index) => (
        <div
          key={index}
          className="transition-transform duration-300 transform hover:scale-105 rounded-2xl shadow-lg p-6 text-center text-white bg-gradient-to-r from-blue-600 to-blue-400 border-l-8 border-yellow-500"
        >
          {/* Imagen */}
          <div className="mb-4">
            <img
              src={persona.imagen}
              alt="Imagen de contacto"
              className="mx-auto w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          </div>

          {/* Info */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{persona.nombre}</h3>
            <p>{persona.puesto}</p>
            <p>Tel: {persona.telefono}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ContactanosPage;