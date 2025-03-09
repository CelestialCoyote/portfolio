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
import ZipLayers from "./_components-militaryBases/ZipCodeLayers";
import { useZipEvents } from "./_utils-militaryBases/useZipEvents";
import DraggablePopup from "../_mapbox-components/DraggablePopup";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";
import BAH from "./_components-militaryBases/BAH";
import Skeleton from "../map-skeleton";


const MilitaryBasesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [mhaData, setMHAData] = useState([]);
    const [selectedBase, setSelectedBase] = useState<GeoJSONFeature | null>(null);
    const [isHoveringControl, setIsHoveringControl] = useState(false);
    const { zipHoverInfo, onZipHover, onZipClick, zipClickedInfo, setZipClickedInfo } = useZipEvents(mhaData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/mha-2025");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();

                // console.log("Fetched Data:", jsonData);
                setMHAData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
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
                    mapboxAccessToken={mapboxToken}
                    style={{ borderRadius: 8 }}
                    onMouseMove={onZipHover}
                    onClick={onZipClick}
                    interactiveLayerIds={["zipCodes"]}
                >
                    <Source type="vector" url="mapbox://celestialcoyote.2xl084fl">
                        <Layer {...basesFill} />
                    </Source>

                    {!isHoveringControl &&
                        <ZipLayers zipHoverInfo={zipHoverInfo} />
                    }

                    {/* Native Mapbox controls */}
                    <ScaleControl position="bottom-right" />
                    <GeolocateControl position="bottom-right" />
                    <NavigationControl position="bottom-right" />

                    {/* Custom controls */}
                    <div
                        className="absolute top-2 left-0 right-0 hidden lg:block"
                        onMouseEnter={() => setIsHoveringControl(true)}
                        onMouseLeave={() => setIsHoveringControl(false)}
                    >
                        <ZoomLevelDisplay
                            mapRef={mapRef}
                            initialViewState={initialViewState}
                        />
                    </div>

                    <div
                        className="absolute top-2 left-2 hidden lg:block"
                        onMouseEnter={() => setIsHoveringControl(true)}
                        onMouseLeave={() => setIsHoveringControl(false)}
                    >
                        <SelectMapStyleDropdown mapRef={mapRef} />
                    </div>

                    <div
                        className="absolute top-2 right-2"
                        onMouseEnter={() => setIsHoveringControl(true)}
                        onMouseLeave={() => setIsHoveringControl(false)}
                    >
                        <BaseMarkerDropdown mapRef={mapRef} setSelectedBase={setSelectedBase} />
                    </div>

                    {/* Circles Component */}
                    <div
                        className="absolute top-16 right-2"
                        onMouseEnter={() => setIsHoveringControl(true)}
                        onMouseLeave={() => setIsHoveringControl(false)}
                    >
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

                    {zipClickedInfo && (
                        <div
                            onMouseEnter={() => setIsHoveringControl(true)}
                            onMouseLeave={() => setIsHoveringControl(false)}
                        >
                            <DraggablePopup xPos={20} yPos={500}>
                                <BAH
                                    zipClickedInfo={zipClickedInfo}
                                    setZipClickedInfo={setZipClickedInfo}
                                />
                            </DraggablePopup>
                        </div>
                    )}
                </Map>
            )}
        </div>
    );
}

export default MilitaryBasesMap;
