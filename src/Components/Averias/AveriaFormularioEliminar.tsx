/*import { useForm } from '@tanstack/react-form'
import { useDeleteUser } from '../../Services/AveriasService'

const AveriaFormularioEliminar = () => {

const {
    mutate: deleteUser,
    isLoading,
    isAdding,
    isError,
    error,
    isSuccess,
  } = useDeleteUser()

  //Solo id porque es lo unico que se necesita para eliminar
  const form = useForm({
    defaultValues: {
      numAveria: '',
    },

    //Cuando se presiona el boton de eliminar
    onSubmit: async ({ value }) => {
      deleteUser({ userId: value.numAveria })
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
        {/* ─── ID Field ───────────────────────── */ /*}
        <div className="flex flex-col">
          <label htmlFor="id" className="mb-1 text-gray-700 font-medium">
            ID:
          </label>
          <form.Field name="id">
            /*{field => (
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
      
        {/* ─── Buttons ────────────────────────── */ /*}
        <div className="flex space-x-4">
          <button
            type="submit"
           /* disabled={!form.state.canSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>      
    )
}

export default AveriaFormularioEliminar;*/
