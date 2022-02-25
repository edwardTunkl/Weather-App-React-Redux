import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { toStringXY } from "ol/coordinate";
import { useSelector } from "react-redux";

export default function MapComponent(props) {
  const lat = useSelector((state) => state.search.latitude)
  const long = useSelector((state) => state.search.longitude);
  const [map, setMap] = useState();

  const mapElement = useRef();


  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://tile.openweathermap.org/map/precipitation_new/7/${Math.round(lat)}/${Math.round(long)}.png?appid=${process.env.REACT_APP_API_KEY}`,
          }),
        }),

        initalFeaturesLayer,
      ],
      view: new View({
        projection: "EPSG:3857",
        center: [long, lat],
        zoom: 10,
      }),
      controls: [],
    });

    setMap(initialMap);

  }, [lat]);

  return (
    <div>
      <div ref={mapElement} className="map-container"></div>
    </div>
  );
}
