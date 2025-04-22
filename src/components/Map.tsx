import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationData {
  latitude: number;
  longitude: number;
  locationName: string;
  onLocationSelect?: (lat: number, lng: number, name: string) => void;
}

function LocationMarker({
  onLocationSelect,
}: {
  onLocationSelect?: (lat: number, lng: number, name: string) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());

      // Reverse geocoding to get location name
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          const name = data.display_name;
          setLocationName(name);
          if (onLocationSelect) {
            onLocationSelect(e.latlng.lat, e.latlng.lng, name);
          }
        });
    });
  }, [map, onLocationSelect]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your location: {locationName}</Popup>
    </Marker>
  );
}

export function Map({
  latitude,
  longitude,
  locationName,
  onLocationSelect,
}: LocationData) {
  const position: [number, number] =
    latitude && longitude ? [latitude, longitude] : [0, 0];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {latitude && longitude ? (
        <Marker position={position}>
          <Popup>{locationName || "Selected Location"}</Popup>
        </Marker>
      ) : (
        <LocationMarker onLocationSelect={onLocationSelect} />
      )}
    </MapContainer>
  );
}
