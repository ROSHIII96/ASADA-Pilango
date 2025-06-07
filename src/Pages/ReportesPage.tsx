import { useState } from "react";
import GenericModal from "../Components/GenericModal";
import AveriaFormularioAgregar from "../Components/Averias/AveriaFormularioAgregar";

const ReportesPage = () => {
  const [showAddModal, setShowAddModal] = useState(true);

  const handleClose = () => {
    setShowAddModal(false);
    window.history.back(); // Vuelve a la página anterior
  };

  const handleSubmitSuccess = () => {
    setShowAddModal(false);
    window.history.back(); // Vuelve a la página anterior
  };

  return (
    <GenericModal
      show={showAddModal}
      onClose={handleClose} // Usa la función que redirige
      title="Agregar nueva avería"
    >
      <AveriaFormularioAgregar
        onClose={handleClose} // Para cerrar desde botones internos
        onSuccess={handleSubmitSuccess} // Para manejar envío exitoso
      />
    </GenericModal>
  );
};

export default ReportesPage;
