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
import { useZipHover } from "./_utils-militaryBases/useZipHover";
import DraggablePopup from "../_mapbox-components/DraggablePopup";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import MercatorGridLines from "../_mapbox-components/GridLinesMercator/MercatorGridLines";
import SelectMapStyleDropdown from "../_mapbox-components/SelectMapStyleDropdown";
import BaseMarkerDropdown from "../_mapbox-components/MilitarybaseMarkers/BaseMarkerDropdown";
import { basesFill } from "../_mapbox-components/MilitarybaseMarkers/base-fill-style";
import Skeleton from "../map-skeleton";
import PayGradeDropdown from "./_components-militaryBases/PaygradeDropdown";


const MilitaryBasesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [mhaData, setMHAData] = useState([]);
    const [payGrade, setPayGrade] = useState("E05");
    const [selectedBase, setSelectedBase] = useState<GeoJSONFeature | null>(null);
    const [isHoveringControl, setIsHoveringControl] = useState(false);
    const { zipHoverInfo, onZipHover, onZipClick, zipClickedInfo, setZipClickedInfo } = useZipHover(mhaData);


    // Set currency format.
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

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
                                <div
                                    className="absolute bg-white w-[260px] rounded-lg border-2 border-black p-2 cursor-move"
                                    style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                                >
                                    <p
                                        className="absolute top-[-12px] right-[-12px] flex items-center justify-center bg-white text-black
                                        w-[25px] h-[25px] border-2 border-gray-500 rounded-full hover:bg-slate-300 hover:text-black cursor-pointer"
                                        onClick={() => setZipClickedInfo(null)}
                                    >
                                        ✖
                                    </p>

                                    <div className="flex flex-col text-black p-1">
                                        <h2 className="text-[16px] font-semibold mb-2 border-b-2 border-black pb-2">
                                            Basic Allowance for Housing:
                                        </h2>
                                        
                                        <div className="mb-4">
                                            <h3 className="text-[14px] font-semibold mb-1">
                                                Select Pay Grade:
                                            </h3>

                                            <PayGradeDropdown
                                                selectedOption={payGrade}
                                                setSelectedOption={setPayGrade}
                                            />
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="font-semibold">Zip Code:</p>
                                            <p>{zipClickedInfo.ZCTA}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="font-semibold">MHA Code:</p>
                                            <p>{zipClickedInfo.mha}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="font-semibold">MHA Name:</p>
                                            <p>{zipClickedInfo.mha_name}</p>
                                        </div>

                                        <p className="font-semibold mb-1 border-b-[1px] border-black pb-1">
                                            Rates:
                                        </p>

                                        <div className="flex flex-col px-3">
                                            {zipClickedInfo.bah && (
                                                (() => {
                                                    const bahEntry = zipClickedInfo.bah.find(entry => entry[payGrade]); // Search for the pay grade
                                                    const bahValues = bahEntry ? bahEntry[payGrade] : undefined; // Get the values

                                                    if (!bahValues) {
                                                        return <p className="text-red-500">No BAH data available for this pay grade</p>;
                                                    }

                                                    return (
                                                        <>
                                                            <div className="flex justify-between">
                                                                <p className="font-semibold">With Dependents:</p>
                                                                <p>
                                                                    {bahValues[0] !== "NULL"
                                                                        ? USDollar.format(bahValues[0] as number)
                                                                        : ""}
                                                                </p>
                                                            </div>

                                                            <div className="flex justify-between">
                                                                <p className="font-semibold">Without Dependents:</p>
                                                                <p>
                                                                    {bahValues[1] !== "NULL"
                                                                        ? USDollar.format(bahValues[1] as number)
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                        </>
                                                    );
                                                })()
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </DraggablePopup>
                        </div>
                    )}
                </Map>
            )}
        </div>
    );
}

export default MilitaryBasesMap;
