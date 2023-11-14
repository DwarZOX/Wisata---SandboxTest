import { MapContainer } from "react-leaflet";
import PropTypes from "prop-types";

const Maps = ({ children, ...rest }) => {
  return (
    <div className="h-[400px] rounded-[20px]">
      <MapContainer center={[-7.857702, 110.272547]} zoom={13} style={{ width: "100%", height: "100%", borderRadius: "20px" }} {...rest}>
        {children}
      </MapContainer>
    </div>
  );
};

Maps.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Maps;
