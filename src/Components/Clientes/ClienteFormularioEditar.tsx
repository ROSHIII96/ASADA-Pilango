import { useForm } from "@tanstack/react-form";
import { useUpdateAbonado } from "../../Hooks/useAbonados";

const ClienteFormularioEditar = ({ abonado, onClose }) => {
  // Grab mutation to update an abonado
  const {
    mutate: updateAbonado,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useUpdateAbonado();

  //  Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      numMedidor: abonado.numMedidor,
      cedula: abonado.cedula,
      name: "",
      email: "",
      direccion: "",
    },
    // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      // value is { id, name, email, role }
      updateAbonado(
        {
          numMedidor: abonado.numMedidor,
          cedula: abonado.cedula,
          name: value.name,
          email: value.email,
          direccion: value.direccion,
        },
        {
          onSuccess: () => {
            if (onClose) onClose(); // Cierra el modal al agregar exitosamente
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
      {/* ─── Numero de cedula y numero de medidor ─────────────────────── */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="cedula"
          className="mb-1 text-gray-700 font-bold text-xl text-center"
        >
          Cedula: {abonado.cedula}
          <br />
          Numero de Medidor: {abonado.numMedidor}
        </label>
      </div>

      {/* ─── Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
          Nombre:
        </label>
        <form.Field name="name">
          {(field) => (
            <input
              id="name"
              name="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Email Field ────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
          Correo Electronico:
        </label>
        <form.Field name="email">
          {(field) => (
            <input
              id="email"
              name="email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Direccion  ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="direccion" className="mb-1 text-gray-700 font-medium">
          Dirección:
        </label>
        <form.Field name="direccion">
          {(field) => (
            <input
              id="direccion"
              name="direccion"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default ClienteFormularioEditar;
