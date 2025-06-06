import { useForm } from "@tanstack/react-form";
//import { useUpdateUser } from "../../Services/AveriasService";
import { useUpdateAveria, useGetAverias } from "../../Hooks/useAverias";

//const ClienteFormularioEditar = () => {
const AveriaFormularioEditar = ({ cliente, onClose }) => {
  const { data: averia } = useGetAverias();
  // 1) grab your mutation
  const {
    mutate: updateaveria,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useUpdateAveria();

  const averiaActual = averia?.find((a) => a.numAveria === cliente.numAveria);

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para obtener la hora actual en formato HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      id: Number,
      numAveria: cliente.numAveria,
      detalle: "",
      Fecha: "",
      hora: "",
      estado: averiaActual?.estado ?? "Inactivo",
    },
    // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      updateaveria(
        {
          id: averiaActual.id,
          numAveria: cliente.numAveria,
          detalle: value.detalle,
          fecha: getCurrentDate(),
          hora: getCurrentTime(),
          latitud: averiaActual.latitud,
          longitud: averiaActual.longitud,
          //ubicacion: averiaActual, // Assuming ubicacion is part of cliente
          estado: value.estado,
        }, // Spread the current cliente data and the form values
        {
          onSuccess: () => {
            if (onClose) onClose(); // Cierra el modal al agregar exitosamente
          },
        }
      ); //contiene los datos actuales del formulario
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* ─── Numero de cedula ─────────────────────── */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="numAveria"
          className="mb-1 text-gray-700 font-bold text-xl text-center"
        >
          Numero de averia: {cliente.numAveria}
        </label>
      </div>

      {/* ─── detalle ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="detalle" className="mb-1 text-gray-700 font-medium">
          Detalle:
        </label>
        <form.Field name="detalle">
          {(field) => (
            <input
              id="detalle"
              name="detalle"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Fecha ────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="Fecha" className="mb-1 text-gray-700 font-medium">
          Fecha:
        </label>
        <form.Field name="Fecha">
          {(field) => (
            <input
              id="Fecha"
              name="Fecha"
              type="Fecha"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Hora ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="hora" className="mb-1 text-gray-700 font-medium">
          Hora:
        </label>
        <form.Field name="hora">
          {(field) => (
            <input
              id="hora"
              name="hora"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Estado (checkbox) ─────────────────────── */}
      <div className="flex items-center space-x-2">
        <form.Field name="estado">
          {(field) => (
            <>
              <input
                id="estado-checkbox"
                name="estado"
                type="checkbox"
                checked={field.state.value === "Reparada"}
                onChange={(e) =>
                  field.handleChange(
                    e.target.checked ? "Reparada" : "En revision"
                  )
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="estado-checkbox"
                className="text-gray-700 font-medium"
              >
                ¿Averia Solucionada?
              </label>
            </>
          )}
        </form.Field>
      </div>

      {/* ─── Buttons ────────────────────────── */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!form.state.canSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Actualizar
        </button>
        <button
          type="button"
          onClick={() => form.reset()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Limpiar formulario
        </button>
      </div>
    </form>
  );
};

export default AveriaFormularioEditar;
