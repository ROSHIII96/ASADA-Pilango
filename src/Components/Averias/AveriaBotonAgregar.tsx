import GenericModal from "../GenericModal";
import AveriaFormularioAgregar from "./AveriaFormularioAgregar";
import { useState } from "react";


const AveriaBotonAgregar = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);

    return (
        <>
            {/* Button row */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white 
                            bg-green-600 rounded-lg hover:bg-blue-700 
                            focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Agregar averia
                </button>
            </div>

            {/* Modal */}
            <GenericModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Agregar nueva averia"
            >
                <AveriaFormularioAgregar onClose={() => setShowAddModal(false)} />
            </GenericModal>
            
        </>
    )
}

export default AveriaBotonAgregar;