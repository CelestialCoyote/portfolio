"use client";

import React, { useState, useEffect, useRef } from "react";
import Map, { MapRef, Layer, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";

import { InitialViewState } from "../_mapbox-components/types/initialViewState";

import Skeleton from "../map-skeleton";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


const initialViewState: InitialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 4.0,
    minZoom: 2.5,
    maxZoom: 18
};

const MilitaryBasesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Simulate a delay to show the skeleton screen
        const timer = setTimeout(() => {
            setLoading(false); // Stop showing the skeleton after 3 seconds
        }, 5);

        return () => clearTimeout(timer); // Cleanup timeout when component unmounts
    }, []);

    if (!mapboxToken) {
        console.error("Mapbox token is missing. Check your environment variables.");
        return (
            <div className="text-red-500 text-center mt-10">
                Error: Mapbox token not found.
            </div>
        );
    }

    return (
        <div className="flex flex-grow w-full h-full max-h-full">
            {/* Show the Skeleton or the Map */}
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

                    {/* Native Mapbox controls */}
                    <ScaleControl position={"bottom-right"} />
                    <GeolocateControl position={"bottom-right"} />
                    <NavigationControl position={"bottom-right"} />

                    {/* Custom controls. */}
                    <div className="absolute top-2 left-0 right-0 hidden lg:block">
                        <ZoomLevelDisplay
                            mapRef={mapRef}
                            initialViewState={initialViewState}
                        />
                    </div>

                    <div className="absolute top-2 left-2 hidden lg:block">
                        <SelectMapStyleDropdown
                            mapRef={mapRef}
                        />
                    </div>

                    <div className="absolute top-2 right-2">
                        <BaseMarkerDropdown
                            mapRef={mapRef}
                        />
                    </div>

                    <MercatorGridLines
                        mapRef={mapRef}
                        interval={10}
                        visible={true}
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
}

export default MilitaryBasesMap;
