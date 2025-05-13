import React from "react";

interface MiembroCardProps {
  nombre: string;
  cargo: string;
  imagen: string;
}

const MiembroCard: React.FC<MiembroCardProps> = ({ nombre, cargo, imagen }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg max-w-xs mx-auto">
      <img
        src={imagen}
        alt={nombre}
        className="w-32 h-32 object-cover rounded-full border-4 border-sky-700 mb-4"
      />
      <h3 className="text-xl font-semibold text-sky-800">{nombre}</h3>
      <p className="text-sm text-gray-600">{cargo}</p>
    </div>
  );
};

export default MiembroCard;
