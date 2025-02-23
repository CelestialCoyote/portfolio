"use client"

import React, { useState } from 'react';
import Map, { Layer, MapMouseEvent, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxToken } from '../_mapbox-components/mapboxToken';

interface GeoJsonFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon' | 'LineString' | 'Point';
    coordinates: any; 
  };
  properties: {
    [key: string]: any;
  };
}

interface GeoJson {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

const data: GeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[-5, 25], [-15, 10], [-5, 10], [-5, 25]]],
      },
      properties: {
        id: 'polygon1',
        name: 'Polygon 1',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[-25, 25], [-35, 10], [-25, 10], [-25, 25]]],
      },
      properties: {
        id: 'polygon2',
        name: 'Polygon 2',
      },
    },
  ],
};

const MapComponent: React.FC = () => {
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | null>(null);

  const handleHover = (event: MapMouseEvent) => {
    if (event.features && event.features.length > 0) {
      setHoveredFeatureId(event.features[0].properties.id);
    } else {
      setHoveredFeatureId(null);
    }
  };

  return (
    <Map
      initialViewState={{
        longitude: -20,
        latitude: 20,
        zoom: 3,
      }}
      style={{ width: '100%', height: '500px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      interactiveLayerIds={['data-layer']}
      onMouseMove={handleHover}
      onMouseLeave={() => setHoveredFeatureId(null)}
      mapboxAccessToken={mapboxToken}
    >
      <Source type="geojson" data={data}>
        <Layer
          id="data-layer"
          type="fill"
          source="data"
          paint={{
            'fill-color': [
              'case',
              ['==', ['get', 'id'], hoveredFeatureId],
              '#007bff', 
              '#3386c0', 
            ],
            'fill-opacity': 0.7,
          }}
        />
      </Source>
    </Map>
  );
};

export default MapComponent;
