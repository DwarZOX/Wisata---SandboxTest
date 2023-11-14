import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import PropTypes from "prop-types";


const UpdatePin = ({ locationByUser, setLocationByUser }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(null);
  const markerRef = useRef(null);


  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const lat = marker.getLatLng().lat;
          const lng = marker.getLatLng().lng;
          setPosition({ lat: lat, lng: lng });
          setLocationByUser({ type: "Point", coordinates: [lng, lat] });
        }
      },
    }),
    [setLocationByUser]
  );

  useEffect(() => {
    if (locationByUser) {
      const { coordinates } = locationByUser;
      if (coordinates) {
        setPosition({ lat: coordinates[1], lng: coordinates[0] });
      }
    }
  }, [locationByUser]);

  useEffect(() => {
    if (position) {
      setLocationByUser({ type: "Point", coordinates: [position.lat, position.lng] });
    }
  }, [setLocationByUser]);

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={position || [0, 0]} ref={markerRef}>
      {draggable ? <Tooltip>Geser marker</Tooltip> : <Tooltip>Klik Marker</Tooltip>}
      <Popup minWidth={90}>
        <span className="cursor-default" onClick={toggleDraggable}>
          {draggable ? "Marker dapat digeser" : "Klik Popup untuk mengedit"}
        </span>
      </Popup>
    </Marker>
  );
};

UpdatePin.propTypes = {
  locationByUser: PropTypes.node.isRequired,
  setLocationByUser: () => {},
}

export default UpdatePin;
