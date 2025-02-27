"use client";

import React, { useEffect, useRef, useState } from "react";
import Map, { MapRef, Layer, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";

import { mapboxToken } from "../_mapbox-components/mapboxToken";
import { initialViewState } from "./_utils-militaryBases/initialViewState";
import { GeoJSONFeature } from "../_mapbox-components/MilitarybaseMarkers/_types/geojson";

import Skeleton from "../map-skeleton";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";

// Function to create a circular polygon in GeoJSON format
const createCircle = (center: [number, number], radiusMeters: number, numPoints = 64) => {
    const [lon, lat] = center;
    const coords = [];

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const dx = radiusMeters * Math.cos(angle);
        const dy = radiusMeters * Math.sin(angle);
        const newCoord = [
            lon + (dx / (111320 * Math.cos(lat * (Math.PI / 180)))), // Adjust longitude
            lat + (dy / 110540), // Adjust latitude
        ];
        coords.push(newCoord);
    }
    coords.push(coords[0]); // Close the polygon

    return {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [coords],
        },
    };
};

const MilitaryBasesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBase, setSelectedBase] = useState<GeoJSONFeature | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log("Selected Base Updated:", selectedBase);
    }, [selectedBase]);

    // Create GeoJSON circles when a base is selected
    const circle25 = selectedBase ? createCircle([selectedBase.geometry.coordinates[0], selectedBase.geometry.coordinates[1]], 40233.5) : null;
    const circle50 = selectedBase ? createCircle([selectedBase.geometry.coordinates[0], selectedBase.geometry.coordinates[1]], 80467) : null;

    return (
        <div className="flex flex-grow w-full h-full max-h-full">
            {loading ? (
                <Skeleton message="Loading military bases map..." />
            ) : (
                <Map
                    ref={mapRef}
                    initialViewState={initialViewState}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={mapboxToken}
                    style={{ borderRadius: 8 }}
                >
                    <Source type="vector" url="mapbox://celestialcoyote.2xl084fl">
                        <Layer {...basesFill} />
                    </Source>

                    {/* Circles Source */}
                    {selectedBase && (
                        <Source
                            id="circles"
                            type="geojson"
                            data={{
                                type: "FeatureCollection",
                                features: [circle25, circle50].filter(Boolean), // Ensure no `null` values
                            }}
                        >
                            <Layer
                                id="circle-25"
                                type="fill"
                                paint={{
                                    "fill-color": "rgba(255, 165, 0, 0.1)", // Orange with transparency
                                    // "fill-outline-color": "rgba(255, 165, 0, 0.8)",
                                }}
                            />

                            <Layer
                                id="circle-50"
                                type="fill"
                                paint={{
                                    "fill-color": "rgba(0, 0, 255, 0.1)", // Blue with transparency
                                    // "fill-outline-color": "rgba(0, 0, 255, 0.6)",
                                }}
                            />
                        </Source>
                    )}

                    {/* Native Mapbox controls */}
                    <ScaleControl position="bottom-right" />
                    <GeolocateControl position="bottom-right" />
                    <NavigationControl position="bottom-right" />

                    {/* Custom controls */}
                    <div className="absolute top-2 left-0 right-0 hidden lg:block">
                        <ZoomLevelDisplay mapRef={mapRef} initialViewState={initialViewState} />
                    </div>

                    <div className="absolute top-2 left-2 hidden lg:block">
                        <SelectMapStyleDropdown mapRef={mapRef} />
                    </div>

                    <div className="absolute top-2 right-2">
                        <BaseMarkerDropdown
                            mapRef={mapRef}
                            setSelectedBase={setSelectedBase}
                        />
                    </div>

                    <MercatorGridLines
                        mapRef={mapRef}
                        interval={10}
                        visible
                        equatorLineColor="#FF5733"
                        equatorLineWidth={3.0}
                        primeMeridianLineColor="#4A90E2"
                        primeMeridianLineWidth={3.0}
                        labelColor="#000"
                        labelFontSize={12}
                    />
                </Map>
            )}
        </div>
    );
};

export default MilitaryBasesMap;




// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Map, { MapRef, Layer, Source } from "react-map-gl";
// import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "../_mapbox-components/map-popup.css";

// import { mapboxToken } from "../_mapbox-components/mapboxToken";
// import { initialViewState } from "./_utils-militaryBases/initialViewState";


// import Skeleton from "../map-skeleton";
// import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
// import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
// import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
// import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
// import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";


// const MilitaryBasesMap: React.FC = () => {
//     const mapRef = useRef<MapRef>(null);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         // Simulate a delay to show the skeleton screen
//         const timer = setTimeout(() => {
//             setLoading(false); // Stop showing the skeleton after 3 seconds
//         }, 1);

//         return () => clearTimeout(timer); // Cleanup timeout when component unmounts
//     }, []);

//     if (!mapboxToken) {
//         console.error("Mapbox token is missing. Check your environment variables.");
//         return (
//             <div className="text-red-500 text-center mt-10">
//                 Error: Mapbox token not found.
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-grow w-full h-full max-h-full">
//             {/* Show the Skeleton or the Map */}
//             {loading ? (
//                 <Skeleton message="Loading military bases map..." />
//             ) : (
//                 <Map
//                     ref={mapRef}
//                     initialViewState={initialViewState}
//                     mapStyle="mapbox://styles/mapbox/streets-v12"
//                     mapboxAccessToken={mapboxToken}
//                     style={{ borderRadius: 8 }}
//                 >
//                     <Source type="vector" url="mapbox://celestialcoyote.2xl084fl">
//                         <Layer {...basesFill} />
//                     </Source>

//                     {/* Native Mapbox controls */}
//                     <ScaleControl position={"bottom-right"} />
//                     <GeolocateControl position={"bottom-right"} />
//                     <NavigationControl position={"bottom-right"} />

//                     {/* Custom controls. */}
//                     <div className="absolute top-2 left-0 right-0 hidden lg:block">
//                         <ZoomLevelDisplay
//                             mapRef={mapRef}
//                             initialViewState={initialViewState}
//                         />
//                     </div>

//                     <div className="absolute top-2 left-2 hidden lg:block">
//                         <SelectMapStyleDropdown
//                             mapRef={mapRef}
//                         />
//                     </div>

//                     <div className="absolute top-2 right-2">
//                         <BaseMarkerDropdown
//                             mapRef={mapRef}
//                         />
//                     </div>

//                     <MercatorGridLines
//                         mapRef={mapRef}
//                         interval={10}
//                         visible={true}
//                         equatorLineColor="#FF5733"
//                         equatorLineWidth={3.0}
//                         primeMeridianLineColor="#4A90E2"
//                         primeMeridianLineWidth={3.0}
//                         labelColor="#000"
//                         labelFontSize={12}
//                     />
//                 </Map>
//             )}
//         </div>
//     );
// }

// export default MilitaryBasesMap;
