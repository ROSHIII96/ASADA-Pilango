import { useForm } from "@tanstack/react-form";
import { useUpdateAveria, useGetAverias } from "../../Hooks/useAverias";

const AveriaFormularioEditar = ({ cliente, onClose }) => {
  const { data: averia } = useGetAverias();
  const {
    mutate: updateaveria,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useUpdateAveria();

  const averiaActual = averia?.find((a) => a.numAveria === cliente.numAveria);

  // Si aún no hay datos, muestra un loader
  if (!averiaActual) {
    return (
      <div className="p-4 text-center text-blue-600">
        Cargando datos de la avería...
      </div>
    );
  }

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const fechaActual = getCurrentDate();
  const horaActual = getCurrentTime();

  const form = useForm({
    defaultValues: {
      id: averiaActual.id,
      numAveria: cliente.numAveria,
      detalle: "",
      estado: averiaActual.estado ?? "Inactivo",
    },
    onSubmit: async ({ value }) => {
      updateaveria(
        {
          id: averiaActual.id,
          numAveria: cliente.numAveria,
          detalle: value.detalle,
          fecha: fechaActual,
          hora: horaActual,
          latitud: averiaActual.latitud,
          longitud: averiaActual.longitud,
          estado: value.estado,
        },
        {
          onSuccess: () => {
            if (onClose) onClose();
          },
        }
      );
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
      {/* Numero de averia */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="numAveria"
          className="mb-1 text-gray-700 font-bold text-xl text-center"
        >
          Numero de averia: {cliente.numAveria}
        </label>
      </div>

      {/* Detalle */}
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

      {/* Fecha y Hora automáticas (solo mostrar, no editar) */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex flex-col mb-2 md:mb-0">
          <label className="mb-1 text-gray-700 font-medium">Fecha:</label>
          <span className="px-3 py-2 bg-gray-100 rounded border border-gray-200">{fechaActual}</span>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Hora:</label>
          <span className="px-3 py-2 bg-gray-100 rounded border border-gray-200">{horaActual}</span>
        </div>
      </div>

      {/* Estado (checkbox) */}
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

      {/* Botones */}
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