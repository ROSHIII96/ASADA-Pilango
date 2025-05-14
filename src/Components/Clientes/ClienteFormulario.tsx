import { useForm } from '@tanstack/react-form'
import { useAddUser } from '../../Services/UsersService'

const ClienteFormulario = () => {

  // 1) grab your mutation
  const {
    mutate: addUser,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddUser()

     // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
     // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      // value is { id, name, email, role }
      addUser({ newUser: value })  //contiene los datos actuales del formulario
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
        {/* ─── ID Field ───────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="id" className="mb-1 text-gray-700 font-medium">
            Cedula:
          </label>
          <form.Field name="id">
            {field => (
              <input
                id="id"
                name="id"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>
      
        {/* ─── Name Field ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
            Nombre:
          </label>
          <form.Field name="name">
            {field => (
              <input
                id="name"
                name="name"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
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
            {field => (
              <input
                id="email"
                name="email"
                type="email"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>
      
        {/* ─── Role Field ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-1 text-gray-700 font-medium">
            Dirección exacta:
          </label>
          <form.Field name="role">
            {field => (
              <input
                id="role"
                name="role"
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

export default ClienteFormulario;