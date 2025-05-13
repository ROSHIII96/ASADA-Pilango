import React, { useEffect, useState } from "react";

const images = [
  "https://images.pexels.com/photos/9400874/pexels-photo-9400874.jpeg",
  "https://images.pexels.com/photos/9400885/pexels-photo-9400885.jpeg",
  "https://images.pexels.com/photos/29293217/pexels-photo-29293217.jpeg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambiar imagen cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
      {/* Imágenes del carrusel */}
      {images.map((src, index) => (
        <img
          key={index}
          src={`${src}?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`} // Optimiza la carga de imágenes
          alt={`Imagen ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Controles de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
