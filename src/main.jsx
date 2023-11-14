import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StateContext } from "@app/context/StateContext";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import RetinaIcon from "leaflet/dist/images/marker-icon-2x.png";
import LeafletIcon from "leaflet/dist/images/marker-icon.png";
import ShadowIcon from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: RetinaIcon,
  iconUrl: LeafletIcon,
  shadowUrl: ShadowIcon,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContext>
      <App />
    </StateContext>
  </React.StrictMode>
);
