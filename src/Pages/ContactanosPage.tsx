const ContactanosPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Contacto</h1>
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800">ASADA Pilangosta</h2>
                        <p className="text-gray-700">Nombre: Juan Pérez</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50688881234" className="text-blue-700 hover:underline">+506 8888-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:presidente@asada.com" className="text-blue-700 hover:underline">presidente@asada.com</a></p>
                    </div>
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Presidente</h2>
                        <p className="text-gray-700">Nombre: Emel Rodríguez Paniagua</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50688881234" className="text-blue-700 hover:underline">+506 8888-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:presidente@asada.com" className="text-blue-700 hover:underline">presidente@asada.com</a></p>
                    </div>
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Vicepresidente</h2>
                        <p className="text-gray-700">Nombre: Felix Elizondo</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50689991234" className="text-blue-700 hover:underline">+506 8999-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:vicepresidente@asada.com" className="text-blue-700 hover:underline">vicepresidente@asada.com</a></p>
                    </div>                   
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Tesorero</h2>
                        <p className="text-gray-700">Nombre: Juan Pérez</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50688881234" className="text-blue-700 hover:underline">+506 8888-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:presidente@asada.com" className="text-blue-700 hover:underline">presidente@asada.com</a></p>
                    </div>
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Gestor de cobro</h2>
                        <p className="text-gray-700">Nombre: Liliana Elizondo Hernández</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50688881234" className="text-blue-700 hover:underline">+506 8888-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:presidente@asada.com" className="text-blue-700 hover:underline">presidente@asada.com</a></p>
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold text-gray-800">Fontanero</h2>
                        <p className="text-gray-700">Nombre: Mauricio Elizondo Hernández</p>
                        <p className="text-gray-700">Teléfono: <a href="tel:+50687771234" className="text-blue-700 hover:underline">+506 8777-1234</a></p>
                        <p className="text-gray-700">Correo: <a href="mailto:fontanero@asada.com" className="text-blue-700 hover:underline">fontanero@asada.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactanosPage;