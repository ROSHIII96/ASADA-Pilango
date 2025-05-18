import { useForm } from '@tanstack/react-form'
import { useUpdateUser } from '../../Services/AveriasService'

//const ClienteFormularioEditar = () => {
  const AveriaFormularioEditar = ({ cliente, onClose }) => {


  // 1) grab your mutation
  const {
    mutate: updateuser,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useUpdateUser()

     // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      id: cliente.numAveria,
      numAveria: cliente.numAveria,
      detalle: '',
      Fecha: '',
      hora: '',
    },
     // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      // value is { id, name, email, role }
      updateuser(
        { updatedUser: value },
        {
        onSuccess: () => {
          if (onClose) onClose(); // Cierra el modal al agregar exitosamente
        }
      }
      )  //contiene los datos actuales del formulario
    },
  })

    return (
        <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >

        
    {/* ─── Numero de cedula ─────────────────────── */}
      <div className="flex flex-col items-center">
        <label htmlFor="numAveria" className="mb-1 text-gray-700 font-bold text-xl text-center">
          Numero de averia: {cliente.numAveria}
        </label>
      </div>
      
        {/* ─── detalle ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="detalle" className="mb-1 text-gray-700 font-medium">
            Detalle:
          </label>
          <form.Field name="detalle">
            {field => (
              <input
                id="detalle"
                name="detalle"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
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
            {field => (
              <input
                id="Fecha"
                name="Fecha"
                type="Fecha"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
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
            {field => (
              <input
                id="hora"
                name="hora"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
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
    )
}

export default AveriaFormularioEditar;