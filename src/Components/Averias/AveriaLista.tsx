import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
//import { useAverias } from '../../Services/AveriasService';
import AveriaBotonEliminar from "./AveriaBotonEliminar";
import AveriaBotonActualizar from "./AveriaBotonActualizar";
import { useGetAverias } from "../../Hooks/useAverias";

const AveriaLista = () => {
  // Obtiene los datos de useAverias y los guarda en data
  const { data, isLoading, isError } = useGetAverias();
  console.log("Averias data:", data);

  // Estado para el filtro
  const [averiaFiltro, setAveriaFiltro] = useState("");
  const [filtroActivo, setFiltroActivo] = useState(false);

  // Filtra y ordena las averías
  const averias = useMemo(() => {
    const arr = data ?? [];
    let filtradas = arr.filter((item) => item.numAveria !== undefined);

    if (filtroActivo && averiaFiltro.trim() !== "") {
      filtradas = filtradas.filter((item) =>
        item.numAveria.toString().includes(averiaFiltro.trim())
      );
    }
    return filtradas.sort((a, b) => Number(a.id) - Number(b.id));
  }, [data, averiaFiltro, filtroActivo]);

  // Define las columnas de la tabla
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        size: 80,
      },
      {
        header: "N° Avería",
        accessorKey: "numAveria",
        cell: (info) => (
          <span className="font-semibold text-blue-600">{info.getValue()}</span>
        ),
        size: 100,
      },
      {
        header: "Detalle",
        accessorKey: "detalle",
        cell: (info) => (
          <span className="max-w-xs line-clamp-2">{info.getValue()}</span>
        ),
        size: 200,
      },
      {
        header: "Fecha",
        accessorKey: "fecha",
        cell: (info) => {
          const date = new Date(info.getValue());
          return <span>{date.toLocaleDateString("es-ES")}</span>;
        },
        size: 120,
      },
      {
        header: "Hora",
        accessorKey: "hora",
        cell: (info) => <span>{info.getValue()}</span>,
        size: 80,
      },
      {
        header: "Estado",
        accessorKey: "estado",
        cell: (info) => <span>{info.getValue()}</span>,
        size: 80,
      },
      {
        header: "Ubicación",
        cell: ({ row }) => {
          const lat = row.original.latitud;
          const lng = row.original.longitud;
          return lat && lng ? (
            <div className="flex flex-col">
              <span className="text-xs">Lat: {Number(lat).toFixed(4)}</span>
              <span className="text-xs">Lng: {Number(lng).toFixed(4)}</span>
              <a
                href={`https://www.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xs"
              >
                Ver mapa
              </a>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Sin ubicación</span>
          );
        },
        size: 150,
      },
      {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <AveriaBotonActualizar row={row} />
            <AveriaBotonEliminar row={row} />
          </div>
        ),
        size: 120,
      },
    ],
    []
  );

  // Crea la tabla
  const table = useReactTable({
    data: averias,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Manejo de estados de carga y error
  if (isLoading) {
    return <div className="p-4">Cargando averías...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error al cargar las averías</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Listado de Averías
      </h1>

      {/* Campo y botón de filtro */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por número de avería
            </label>
            <input
              type="text"
              placeholder="Ej: 1001"
              value={averiaFiltro}
              onChange={(e) => setAveriaFiltro(e.target.value)}
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
                setAveriaFiltro("");
                setFiltroActivo(false);
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de averías */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ width: header.getSize() }}
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                  No se encontraron averías
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AveriaLista;
