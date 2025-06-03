import { useState } from "react";
import GenericModal from "../Components/GenericModal";
import AveriaFormularioAgregar from "../Components/Averias/AveriaFormularioAgregar";

const ReportesPage = () => {
const [showAddModal, setShowAddModal] = useState(true);

  return (
    <GenericModal
      show={showAddModal}
      onClose={() => setShowAddModal(false)}
      title="Agregar nueva averia">

      <AveriaFormularioAgregar onClose={() => setShowAddModal(false)} />

    </GenericModal>
  )
};

export default ReportesPage;