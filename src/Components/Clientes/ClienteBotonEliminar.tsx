import ClienteGenericModal from "./ClienteGenericModal";
import ClienteFormulario from "./ClienteFormulario";
import { useState } from "react";

const ClienteBotonEliminar = () =>
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
                    Add User
                </button>
            </div>

            {/* Modal */}
            <ClienteGenericModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Create New User"
            >
                <ClienteFormulario />
            </ClienteGenericModal>
            
        </>
    )
}

export default ClienteBotonEliminar;