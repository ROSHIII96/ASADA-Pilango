import React, { useState } from "react";
import { useRouter } from '@tanstack/react-router';
import GenericModal from "../Components/GenericModal";
import AveriaFormularioAgregar from "../Components/Averias/AveriaFormularioAgregar";

const ReportesPage = () => {
  const [showAddModal, setShowAddModal] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setShowAddModal(false);
    router.navigate({ to: '/' }); // Redirige al Home al cerrar
  };

  const handleSubmitSuccess = () => {
    setShowAddModal(false);
    router.navigate({ to: '/' }); // Redirige al Home después de enviar
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
  )
};

export default ReportesPage;