import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css"; // Import map style

mapboxgl.accessToken = "API"; // API token

export default function MapsContainer() {
  const mapContainer = useRef(null); // Reference container
  const map = useRef(null); // Reference map
  const [cinemas, setCinemas] = useState([]); // List of cinemas
  const [selectedCinema, setSelectedCinema] = useState(null); // Cinema selected

  // Initiate the map
  const initMap = () => {
    if (map.current) return; // Nothing happen if exist an instance of map

    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Map container
      style: "mapbox://styles/mapbox/streets-v11", // Map Style
      center: [2.088896, 41.327546], // Barcelona center coordenates
      zoom: 12, // initial zoom
    });
  };

  // Get cinemas from the API backend
  const fetchCinemas = () => {
    axios
      .get("http://localhost:5000/cinemas")
      .then((response) => {
        setCinemas(response.data); // Update the list of cinemas.
      })
      .catch((err) => console.error("Error fetching cinemas:", err));
  };

  // Manage the selection of Cinema in the list
  const handleCinemaSelect = (e) => {
    const selectedId = e.target.value;
    const cinema = cinemas.find((c) => c.id.toString() === selectedId);

    if (cinema && map.current) {
      setSelectedCinema(cinema);

      // Add a marker and center the map
      new mapboxgl.Marker()
        .setLngLat([cinema.longitude, cinema.latitude]) // Cinema coordenates
        .setPopup(new mapboxgl.Popup().setText(cinema.name)) // Pop up the name of the cinema
        .addTo(map.current); // Add the map marker

      map.current.flyTo({
        center: [cinema.longitude, cinema.latitude],
        zoom: 14,
      });
    }
  };

  useEffect(() => {
    initMap(); // Initize the map
    fetchCinemas(); // Get cinema list from the API backend
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-5xl p-4 flex justify-center gap-4">
        <select
          className="select select-primary w-full max-w-xs"
          onChange={handleCinemaSelect}
          defaultValue=""
        >
          <option value="" disabled>
            All locations
          </option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map container*/}
      <div
        ref={mapContainer}
        className="w-full max-w-5xl h-[500px] sm:h-[600px] lg:h-[700px] mt-4 rounded-lg shadow-lg"
      ></div>
    </div>
  );
}
