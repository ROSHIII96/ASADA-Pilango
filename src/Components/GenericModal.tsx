const GenericModal = ({ show, onClose, title, children }) => {
  if (!show) return null;  //Para que el modal no se muestre de un solo

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>
        
        {/* Contenido con scroll */}
        <div className="overflow-y-auto p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GenericModal;