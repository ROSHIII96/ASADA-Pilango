import { useForm } from "@tanstack/react-form";
import { useAddAveria, useGetAverias } from "../../Hooks/useAverias";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Configuración de iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Toma la ubicacion para el marcador de ubicación de la persona
const LocationMarker = ({ position, setPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
};

const AveriaFormularioAgregar = ({ onClose }) => {
  const navigate = useNavigate();
  const { data: averias } = useGetAverias();
  const [position, setPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [formError, setFormError] = useState("");
  const mapRef = useRef(null);

  // Función para obtener la fecha actual en formato DD/MM/YYYY
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para obtener la hora actual en formato HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalización no soportada por tu navegador");
      return;
    }

    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = L.latLng(pos.coords.latitude, pos.coords.longitude);
        setPosition(newPosition);
        if (mapRef.current) {
          mapRef.current.flyTo(newPosition, 15);
        }
      },
      (err) => {
        setLocationError(`Error al obtener ubicación: ${err.message}`);
      }
    );
  };

  const { mutate: addAveria, isLoading } = useAddAveria();

  // Función para obtener el siguiente ID y número de avería
  function getNextAveriaIds(averias) {
    const ids = averias.map((a) => Number(a.id)).filter(Number.isFinite);
    const nums = averias
      .map((a) => Number(a.numAveria))
      .filter(Number.isFinite);

    let nextId = 1;
    while (ids.includes(nextId)) nextId++;

    const nextNumAveria = nums.length > 0 ? Math.max(...nums) + 1 : 1;

    return { nextId, nextNumAveria };
  }

  const { nextId, nextNumAveria } = getNextAveriaIds(averias ?? []);

  const form = useForm({
    defaultValues: {
      id: nextId,
      numAveria: nextNumAveria,
      detalle: "",
      Fecha: "",
      hora: "",
      latitud: "",
      longitud: "",
      estado: "",
    },
    onSubmit: async ({ value }) => {
      setFormError(""); // Limpiar errores anteriores

      // Validación mejorada del detalle
      const detalleTrimmed = value.detalle.trim();
      if (!detalleTrimmed || detalleTrimmed.length < 5) {
        setFormError("El detalle debe tener al menos 5 caracteres");
        return;
      }

      const finalValue = {
        id: nextId,
        numAveria: nextNumAveria,
        detalle: detalleTrimmed,
        fecha: getCurrentDate(),
        hora: getCurrentTime(),
        latitud: position ? position.lat.toString() : "",
        longitud: position ? position.lng.toString() : "",
        estado: "En revisión",
      };

      addAveria(finalValue, {
        onSuccess: () => {
          alert("Averia agregada correctamente");
          if (onClose) onClose();
        },
        onError: (error) => {
          console.error("Error al guardar:", error);
          setFormError(
            "Error al guardar la avería. Por favor intente nuevamente."
          );
        },
      });
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
      {/* Campos ocultos */}
      <form.Field name="numAveria">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>
      <form.Field name="id">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>
      <form.Field name="Fecha">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>
      <form.Field name="hora">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>

      {/* Campo de detalle */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Detalle:*</label>
        <form.Field name="detalle">
          {(field) => (
            <>
              <textarea
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setFormError(""); // Limpiar error al escribir
                }}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describa el problema con detalle (mínimo 5 caracteres)"
              />
              {formError && (
                <div className="mt-1 text-sm text-red-500">{formError}</div>
              )}
            </>
          )}
        </form.Field>
      </div>

      {/* Mapa */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 font-medium">Ubicación:</label>
          <div className="space-x-2">
            <button
              type="button"
              onClick={getUserLocation}
              className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
            >
              Mi ubicación
            </button>
            <button
              type="button"
              onClick={() => setPosition(null)}
              className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="h-48 w-full rounded-md overflow-hidden border border-gray-300">
          <MapContainer
            center={[10.1483, -85.452]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map) => {
              mapRef.current = map;
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        {position ? (
          <div className="mt-2 text-sm text-gray-600">
            Ubicación seleccionada: Lat {position.lat.toFixed(4)}, Lng{" "}
            {position.lng.toFixed(4)}
          </div>
        ) : (
          <div className="mt-2 text-sm text-gray-400">
            Haz clic en el mapa o usa el botón "Mi ubicación"
          </div>
        )}

        {locationError && (
          <div className="mt-2 text-sm text-red-500">{locationError}</div>
        )}
      </div>

      {/* Campos ocultos para coordenadas */}
      <form.Field name="latitud">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={position?.lat || ""}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>
      <form.Field name="longitud">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={position?.lng || ""}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>

      {/* Botones de acción */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : "Agregar Avería"}
        </button>
        <button
          type="button"
          onClick={() => {
            form.reset();
            setPosition(null);
            setFormError("");
            form.setFieldValue("Fecha", getCurrentDate());
            form.setFieldValue("hora", getCurrentTime());
          }}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Limpiar formulario
        </button>
      </div>
    </form>
  );
};

export default AveriaFormularioAgregar;
