import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ClienteBotonEliminar from "./ClienteBotonEliminar";
import ClienteBotonActualizar from "./ClienteBotonActualizar";
import { useGetAbonados } from "../../Hooks/useAbonados";

const ClientesLista = () => {
  const { data, isLoading, isError, error } = useGetAbonados();

  const [cedulaFiltro, setCedulaFiltro] = useState("");
  const [filtroActivo, setFiltroActivo] = useState(false);

  // Filtra y ordena los clientes
  const abonados = useMemo(() => {
    const arr = data ?? [];
    let clientes = arr.filter((item) => item.cedula !== undefined);

    if (filtroActivo && cedulaFiltro.trim() !== "") {
      clientes = clientes.filter((item) =>
        item.cedula.toString().includes(cedulaFiltro.trim())
      );
    }

    return clientes.sort((a, b) => Number(a.numMedidor) - Number(b.numMedidor));
  }, [data, cedulaFiltro, filtroActivo]);

  // Define columnas
  const columns = useMemo(
    () => [
      {
        header: "N° Medidor",
        accessorKey: "numMedidor",
        cell: (info) => (
          <span className="font-semibold text-blue-600">{info.getValue()}</span>
        ),
        size: 100,
      },
      {
        header: "Cédula",
        accessorKey: "cedula",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        size: 120,
      },
      {
        header: "Nombre",
        accessorKey: "name",
        cell: (info) => <span>{info.getValue()}</span>,
        size: 180,
      },
      {
        header: "Correo electrónico",
        accessorKey: "email",
        cell: (info) => (
          <span className="text-blue-500 hover:underline">{info.getValue()}</span>
        ),
        size: 200,
      },
      {
        header: "Dirección",
        accessorKey: "direccion",
        cell: (info) => (
          <span className="max-w-xs line-clamp-2">{info.getValue()}</span>
        ),
        size: 250,
      },
      {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <ClienteBotonActualizar row={row} />
            <ClienteBotonEliminar row={row} />
          </div>
        ),
        size: 120,
      },
    ],
    []
  );

  const table = useReactTable({
    data: abonados,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Cargando clientes...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Listado de Clientes</h1>

      {/* Campo y botón de filtro */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por cédula
            </label>
            <input
              type="text"
              placeholder="Ej: 123456789"
              value={cedulaFiltro}
              onChange={(e) => setCedulaFiltro(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => setFiltroActivo(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
            <button
              onClick={() => {
                setCedulaFiltro("");
                setFiltroActivo(false);
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:scale-[1.02] hover:shadow-md hover:bg-blue-50 transition-all duration-200 transform"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No se encontraron clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesLista;
