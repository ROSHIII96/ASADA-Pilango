import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useUsers } from '../../Services/UsersService';
import ClienteBotonEliminar from "././ClienteBotonEliminar";
import ClienteBotonActualizar from './ClienteBotonActualizar'

const ClientesLista = () => {
  //Obtiene los datos de useUsers y los guarda en data
  const { data, isLoading, isError, error } = useUsers();

  // Estado para el filtro de cédula
  const [cedulaFiltro, setCedulaFiltro] = useState('');
  const [filtroActivo, setFiltroActivo] = useState(false);

  //si data es null se usa arreglo vacio
  //Mientras que no se realice ningun cambio en data, no se vuelve a calcular users

  // Filtra los clientes por cédula si el filtro está activo
  const users = useMemo(() => {
    const arr = data ?? [];
    let clientes = arr.filter(item => item.numMedidor !== undefined);
    if (filtroActivo && cedulaFiltro.trim() !== '') {
      clientes = clientes.filter(item => item.cedula === cedulaFiltro.trim());
    }
    return clientes.sort((a, b) => Number(a.numMedidor) - Number(b.numMedidor));
  }, [data, cedulaFiltro, filtroActivo]);

  //Define las columnas de la tabla
  const columns = useMemo(
    () => [
    //Cedula es el nombre de la columna y id es el nombre
    // de la propiedad en el objeto, osea en JSONBin
    { header: 'Numero de medidor',    accessorKey: 'numMedidor' }, 
    { header: 'Cedula',    accessorKey: 'cedula' }, 
    { header: 'Nombre',  accessorKey: 'name' },
    { header: 'Correo electronico', accessorKey: 'email' },
    { header: 'Direccion exacta',  accessorKey: 'direccion' },
    {
      header: 'Acciones', // Nueva columna donde iran los botones
      cell: ({ row }) =>  // Renderiza el botón editar y eliminar en cada fila
      <div className="flex space-x-2">
          <ClienteBotonActualizar row={row}/>  
          <ClienteBotonEliminar row={row} />
      </div>
    },
    ],
    []
  );

  // Crea la tabla 
  const table = useReactTable({
        data: users,  //aqui funciona igual si se elimina users y se deja data solamente
        columns,
        getCoreRowModel: getCoreRowModel(),
  });


 //Si isLoading es verdadero muestra el mensaje de carga, si es falso muestra el mensaje de error
 if (isLoading) {
  return <div className="p-4">Loading users...</div>;
  }
 if (isError) {
    return <div className="p-4 text-red-500">Error: {er-ror.message}</div>;
  }

return(
<div className="p-4 bg-gray-100 min-h-screen">

 {/* Campo y botón de filtro */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={cedulaFiltro}
          onChange={e => setCedulaFiltro(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setFiltroActivo(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        <button
          onClick={() => { setCedulaFiltro(''); setFiltroActivo(false); }}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Limpiar
        </button>
      </div>

  <div className="overflow-x-auto bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300">
    <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-6 py-3 w-1/5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 transition-colors"
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="px-6 py-4 text-left text-sm text-gray-700 align-middle"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
)
}

export default ClientesLista;