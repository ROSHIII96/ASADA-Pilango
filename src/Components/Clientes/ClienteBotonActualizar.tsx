import GenericModal from "./GenericModal";
import ClienteFormularioEditar from "./ClienteFormularioEditar";
import { useState } from "react";

const ClienteBotonActualizar = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);

    return (
        <>
            {/* Button row */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white 
                            bg-blue-600 rounded-lg hover:bg-blue-700 
                            focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Editar
                </button>
            </div>

            {/* Modal */}
            <GenericModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Actualizar cliente"
            >
                <ClienteFormularioEditar />
            </GenericModal>
            
        </>
    )
}

export default ClienteBotonActualizar;