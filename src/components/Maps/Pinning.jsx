import { useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const Pinning = ({ onChange }) => {
  const [pinCoordinate, setPinCoordinate] = useState(null);

  const onDeletedPin = () => setPinCoordinate(null);
  const onEditPin = ({layers}) => {
    setPinCoordinate(layers.toGeoJSON().features[0].geometry);
  };
  
  const onCreatedPin = ({layer}) => {
    setPinCoordinate(layer.toGeoJSON().geometry);
  };

  useEffect(() => {
    onChange(pinCoordinate);
  }, [pinCoordinate]);

  useEffect(() => {
    const drawToolbar = document.querySelector(".leaflet-draw-toolbar-top");

    if (pinCoordinate) {
      drawToolbar.classList.add("d-none");
    }

    return () => drawToolbar.classList.remove("d-none");
  }, [pinCoordinate]);

  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        onEdited={onEditPin}
        onCreated={onCreatedPin}
        onDeleted={onDeletedPin}
        draw={{
          rectangle: false,
          circle: false,
          circlemarker: false,
          polygon: false,
          polyline: false,
        }}
      />
    </FeatureGroup>
  );
};

Pinning.propTypes = {
  onChange: () => {},

}

export default Pinning;
