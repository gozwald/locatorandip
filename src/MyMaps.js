import React from "react";
import { Map, TileLayer } from "react-leaflet";

const TheMap = props => {
  const { point } = props;

  return (
    <div id="mapid">
      <Map center={point} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </div>
  );
};

export default TheMap;
