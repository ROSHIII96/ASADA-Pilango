import React, { useEffect, useState } from "react";
import asada1 from '../Fotos/Asada1.png';
import asada2 from '../Fotos/Asada2.png';
import asada3 from '../Fotos/Asada3.png';
import asada4 from '../Fotos/Asada4.png';

const images = [asada1, asada2, asada3, asada4];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Imagen ${index + 1}`}
          className={`w-full h-auto object-contain transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        />
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-blue-700 transition"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-blue-700 transition"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
