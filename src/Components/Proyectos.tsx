// src/Components/Proyectos.tsx
import React from "react";

const proyectos = [
  {
    imgSrc: "https://img.freepik.com/fotos-premium/trabajo-maquinaria-pesada-perforacion-construccion-8k-hd_1033957-26171.jpg",
    descripcion: "Proyecto realizado: Mejora de infraestructura hídrica para optimizar el suministro de agua a las comunidades.",
    categoria: "Realizados",
  },
  {
    imgSrc: "https://th.bing.com/th/id/OIP.5fe-qUFSkDFUGVvIdBL-GwHaEK?cb=iwp2&rs=1&pid=ImgDetMain",
    descripcion: "Proyecto en curso: Reforestación de cuencas hidrográficas para mejorar la captación de agua de lluvia.",
    categoria: "En Curso",
  },
  {
    imgSrc: "https://th.bing.com/th/id/OIP.wC9f981P0dYgOfX2WAJt7wHaE8?cb=iwp2&rs=1&pid=ImgDetMain",
    descripcion: "Proyecto futuro: Campañas educativas sobre el uso responsable del agua, dirigidas a niños y adultos.",
    categoria: "Futuros",
  },
];

const Proyectos = () => {
  return (
    <section className="mt-12 px-4 py-8 bg-teal-50">
      <h2 className="text-3xl font-semibold text-center text-teal-800 mb-6">
        Nuestros Proyectos
      </h2>
      <div className="flex justify-between gap-8">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-1/3 transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-teal-700 text-center mb-2">
              {proyecto.categoria}
            </h3>
            <img
              src={proyecto.imgSrc}
              alt={`Proyecto ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-center text-teal-700">{proyecto.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
