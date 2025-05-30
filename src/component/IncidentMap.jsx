import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function IncidentMap() {
  const [incidentes, setIncidentes] = useState([])

  useEffect(() => {
    const fetchIncidentes = async () => {
      const { data } = await supabase
        .from('incidentes')
        .select('id, titulo, empresa_afectada, ubicacion')
        .not('ubicacion', 'is', null)
        
      setIncidentes(data || [])
    }

    fetchIncidentes()
  }, [])

  return (
    <div className="mt-8 h-96">
      <h2 className="text-2xl font-bold mb-4">Mapa de Incidentes</h2>
      <MapContainer 
        center={[40.4168, -3.7038]} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {incidentes.map(incidente => (
          <Marker
            key={incidente.id}
            position={[
              incidente.ubicacion.coordinates[1], 
              incidente.ubicacion.coordinates[0]
            ]}
          >
            <Popup>
              <strong>{incidente.titulo}</strong><br />
              {incidente.empresa_afectada}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
