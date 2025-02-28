"use client";

import React, { useEffect, useRef, useState } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";

import { mapboxToken } from "../_mapbox-components/mapboxToken";
import { initialViewState } from "./_utils-militaryBases/initialViewState";
import { GeoJSONFeature } from "../_mapbox-components/MilitarybaseMarkers/_types/geojson";
import MapCircles from "../_mapbox-components/MapCircles/MapCircles";

import Skeleton from "../map-skeleton";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";


const MilitaryBasesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBase, setSelectedBase] = useState<GeoJSONFeature | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-grow w-full h-full max-h-full">
            {loading ? (
                <Skeleton message="Loading military bases map..." />
            ) : (
                <Map
                    ref={mapRef}
                    initialViewState={initialViewState}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={mapboxToken} style={{ borderRadius: 8 }}
                >
                    <Source type="vector" url="mapbox://celestialcoyote.2xl084fl">
                        <Layer {...basesFill} />
                    </Source>

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
                        <BaseMarkerDropdown mapRef={mapRef} setSelectedBase={setSelectedBase} />
                    </div>

                    {/* Circles Component */}
                    <div className="absolute top-16 right-2">
                        <MapCircles
                            center={
                                selectedBase ?
                                [selectedBase.geometry.coordinates[0], selectedBase.geometry.coordinates[1]] : null
                            }
                        />
                    </div>

                    <MercatorGridLines
                        mapRef={mapRef}
                        interval={10}
                        visible equatorLineColor="#FF5733"
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
