import { useForm } from '@tanstack/react-form'
import { useAddUser, useUsers } from '../../Services/UsersService'


const AveriaFormularioAgregar = ({ onClose }) => {
  const { data: users } = useUsers();

// 1. Obtén todos los números de avería existentes y ordénalos
  const averias = users
    ? users.map(u => Number(u.numAveria)).filter(n => !isNaN(n)).sort((a, b) => a - b)
    : [];

  // 2. Encuentra el menor número positivo que no esté en la lista
  let nextNumAveria = 1;
  for (let i = 0; i < averias.length; i++) {
    if (averias[i] === nextNumAveria) {
      nextNumAveria++;
    } else if (averias[i] > nextNumAveria) {
      break;
    }
  }


  // 1) grab your mutation
  const {
    mutate: addUser,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddUser()

  const form = useForm({
    defaultValues: {
      numAveria: nextNumAveria.toString(), 
      detalle: '',
      Fecha: '',
      hora: '',
      //estado: '',
    },
     //Cuando se presiona el boton de agregar, se ejecuta la mutacion
    onSubmit: async ({ value }) => {
      addUser(
        { newUser: value },
        {
        onSuccess: () => {
          if (onClose) onClose(); // Cierra el modal al agregar exitosamente
        }
        }
        )
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

   
      
        {/* ─── Detalle ─────────────────────── */}
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
    )
}

export default AveriaFormularioAgregar;

/*
{/* ─── Numero medidor Field ───────────────────────── *//*}
        <div className="flex flex-col">
          <label htmlFor="numMedidor" className="mb-1 text-gray-700 font-medium">
            Numero medidor:
          </label>
          <form.Field name="numMedidor">
           /* {field => (
              <input
                id="numMedidor"
                name="numMedidor"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>*/