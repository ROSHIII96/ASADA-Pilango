import { useForm } from "@tanstack/react-form";
import { useAddAbonado, useGetAbonados } from "../../Hooks/useAbonados";

const ClienteFormulario = ({ onClose }) => {
  const { data: abonados } = useGetAbonados();

  //Obtiene todos los números de medidor existentes y los ordena
  const medidores = abonados
    ? abonados
        .map((u) => Number(u.numMedidor))
        .filter((n) => !isNaN(n))
        .sort((a, b) => a - b)
    : []; //Si no hay usuarios, medidores será un array vacío

  // Encuentra el menor número positivo de medidor que no esté en la lista, para asignarlo al nuevo abonado
  let nextNumMedidor = 1;
  for (let i = 0; i < medidores.length; i++) {
    if (medidores[i] === nextNumMedidor) {
      nextNumMedidor++;
    } else if (medidores[i] > nextNumMedidor) {
      break;
    }
  }

  // Graba la mutación para agregar un abonado
  const {
    mutate: addAbonado,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddAbonado();

  // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      numMedidor: nextNumMedidor,
      cedula: "",
      name: "",
      email: "",
      direccion: "",
    },
    //Cuando se presiona el boton de agregar, se ejecuta la mutacion
    onSubmit: async ({ value }) => {
      if (abonados.some((u) => u.cedula === Number(value.cedula))) {
        alert("Ya existe un abonado con esta cedula");
        return;
      } else {
        addAbonado(
          {
            numMedidor: nextNumMedidor,
            cedula: Number(value.cedula),
            name: value.name,
            email: value.email,
            direccion: value.direccion,
          },
          {
            onSuccess: () => {
              if (onClose) onClose(); // Cierra el modal al agregar exitosamente
              alert(`El abonado ${value.name} fue agregado exitosamente`);
            },
          }
        );
      }
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
      {/* ─── Cedula ───────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="cedula" className="mb-1 text-gray-700 font-medium">
          Cedula:
        </label>
        <form.Field name="cedula">
          {(field) => (
            <input
              id="cedula"
              name="cedula"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Nombre abonado ─────────────────────── */}
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

      {/* ─── Correo electronico ────────────────────── */}
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

      {/* ─── Direccion exacta ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="direccion" className="mb-1 text-gray-700 font-medium">
          Dirección exacta:
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
          Agregar
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

export default ClienteFormulario;
