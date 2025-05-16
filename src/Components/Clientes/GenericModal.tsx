//import ClienteFormulario from './ClienteFormularioAgregar';

const GenericModal = ({ show, onClose, title, children }) => {

    if (!show) return null;

    return (
      // fondo
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {/* panel */}
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {/* boton de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
  
          {/* titulo opcional, depende del boton */}
          {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
  
          {/* Lo que se quiera pasar(agregar, editar o eliminar) */}
          {children}
        </div>
      </div>
    );
}

export default GenericModal;