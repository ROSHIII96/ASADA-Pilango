import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { useUsers } from '../../Services/UsersService';
import ClienteBotonEliminar from "././ClienteBotonEliminar";
import ClienteBotonActualizar from './ClienteBotonActualizar'

const ClientesLista = () => {
    
  //Obtiene los datos de useUsers y los guarda en data
  const { data, isLoading, isError, error } = useUsers();

  //Users es una version procesada de los datos obtenidos de useUsers
  //si data es null se usa arreglo vacio
  //Mientras que no se realice ningun cambio en data, no se vuelve a calcular users
	const users = useMemo(() => data ?? [], [data]);

  //2. Define table columns
  const columns = useMemo(
    () => [
    //ID es el nombre de la columna y id es el nombre de la propiedad en el objeto, osea en JSONBin
    { header: 'Numero medidor',    accessorKey: 'numMedidor' }, 
    { header: 'Cedula',    accessorKey: 'id' }, 
    { header: 'Nombre',  accessorKey: 'name' },
    { header: 'Correo electronico', accessorKey: 'email' },
    { header: 'Direccion exacta',  accessorKey: 'role' },
    {
      header: 'Acciones', // Nueva columna para el botón
      cell: ({ row }) =>  // Renderiza el botón en cada fila
      <div className="flex space-x-2">
          <ClienteBotonActualizar />
          <ClienteBotonEliminar row={row} />
      </div>
    },
    ],
    []
  );

  // Create table instance
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
  <div></div>
</div>
)
}

export default ClientesLista;