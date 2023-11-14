import { GeoJSON } from "react-leaflet";
import useSWR from "swr";

const Layer = () => {
  const { error: geoError, data: geoResponse } = useSWR("/datamaster/borderline/");

  const isGeoData = geoResponse?.data;

  if (geoError) {
    return null;
  }

  return <GeoJSON data={isGeoData} />;
};

export default Layer;
