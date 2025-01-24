import React from "react";
import Image from "next/image";
import { MapRef, Marker } from "react-map-gl";


// Define the types for the GeoJSON data and its structure
type Geometry = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

type Feature = {
  type: "Feature";
  geometry: Geometry;
  properties: Record<string, any>; // Adjust if you know the exact structure of properties
};

type GeoJSONData = {
  type: "FeatureCollection";
  features: Feature[];
};

// Props type definition for BaseMarker component
type BaseMarkerProps = {
  mapRef: React.RefObject<MapRef | null>;
  data: GeoJSONData; // Type for the GeoJSON data
  imagePath: string; // Path to the image file
  setSelectedBase: (base: Feature) => void; // Function to set the selected base
  setSelectedArea: (base: Feature) => void; // Function to set the selected area
  setHoveredBase: (base: Feature | null) => void; // Function to set the hovered base
};

const BaseMarker: React.FC<BaseMarkerProps> = ({
  mapRef,
  data,
  imagePath,
  setSelectedBase,
  setSelectedArea,
  setHoveredBase,
}) => {
  return (
    <>
      {data?.features?.map((base: Feature, index: number) => (
        <Marker
          key={index}
          latitude={base.geometry.coordinates[1]} // Latitude
          longitude={base.geometry.coordinates[0]} // Longitude
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setSelectedBase(base);
            setSelectedArea(base);

            mapRef.current?.flyTo({
              center: [base.geometry.coordinates[0], base.geometry.coordinates[1]],
              zoom: 9,
              duration: 4000,
            });
          }}
        >
          <Image
            className="w-6 h-6 object-contain"
            src={imagePath}
            alt="Branch Icon"
            placeholder="blur"
            blurDataURL={imagePath}
            width={0}
            height={0}
            sizes="100vh"
            onMouseEnter={() => setHoveredBase(base)}
            onMouseLeave={() => setHoveredBase(null)}
          />
        </Marker>
      ))}
    </>
  );
};

export default BaseMarker;
