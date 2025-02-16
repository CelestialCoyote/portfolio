"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Map, { Layer, MapRef, Marker, Popup, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";
import { initialViewState } from "./_earthquake-utils/initalViewState";
import { Earthquake, FeatureCollection } from "./types/earthquakeTypes";
import { getColorByMagnitude } from "./_earthquake-utils/getColorByMagnitude";
import { filterEarthquakesByDay } from "./_earthquake-utils/filterEarthQuakesByDay";
import { formatTimestamp } from "./_earthquake-utils/formatTimeStamp";
import PlateBoundaries from "./_earthquake-components/PB2002_boundaries.json";
// import PlateBoundaries from "./_earthquake-components/PB2002_plates.json";
import EarthquakeControlPanel from "./_earthquake-components/EarthquakeControlPanel";
import DraggablePopup from "../_mapbox-components/DraggablePopup";
import GridLinesGlobe from "../_mapbox-components/GridLinesGlobe/GridLinesGlobe";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const EarthquakesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [earthquakes, setEarthquakes] = useState<FeatureCollection | null>(null);
    const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
    const [hoveredEarthquake, setHoveredEarthquake] = useState<Earthquake | null>(null);
    const [allDays, setAllDays] = useState(true);
    const [timeRange, setTimeRange] = useState<[number, number]>([0, 0]);
    const [selectedTime, setSelectedTime] = useState(0);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const fetchEarthquakeData = async () => {
            const now = new Date();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);

            const startTime = thirtyDaysAgo.toISOString();
            const endTime = now.toISOString();

            const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=2.5`;

            try {
                const response = await fetch(url);

                if (!response.ok) throw new Error("Failed to fetch earthquake data");

                const data: FeatureCollection = await response.json();
                setEarthquakes(data);

                const startTimeStamp = data.features[data.features.length - 1]?.properties.time;
                const endTimeStamp = data.features[0]?.properties.time;

                setTimeRange([startTimeStamp, endTimeStamp]);
                setSelectedTime(endTimeStamp);
            } catch (error) {
                console.error("Error fetching earthquake data:", error);
            }
        }

        fetchEarthquakeData();
    }, []);

    const data = useMemo(() => {
        if (!earthquakes) return null;

        return allDays ? earthquakes : filterEarthquakesByDay(earthquakes, selectedTime);
    }, [earthquakes, allDays, selectedTime]);


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
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                mapboxAccessToken={mapboxToken}
                style={{ borderRadius: 8 }}
                onLoad={() => setMapLoaded(true)}
            >
                <Source id="tectonic-plates-source" type="geojson" data={PlateBoundaries}>
                    <Layer
                        id="tectonic-plates-layer"
                        type="line"
                        paint={{
                            "line-color": "#FF5733",
                            "line-width": 2,
                        }}
                    />
                </Source>

                {mapLoaded && data &&
                    data.features.map((quake) => (
                        <Marker
                            key={quake.id}
                            longitude={quake.geometry.coordinates[0]}
                            latitude={quake.geometry.coordinates[1]}
                            pitchAlignment="auto"
                            onClick={() => setSelectedEarthquake(quake)}
                        >
                            <div
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: getColorByMagnitude(quake.properties.mag),
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={() => setHoveredEarthquake(quake)}
                                onMouseLeave={() => setHoveredEarthquake(null)}
                            ></div>
                        </Marker>
                    ))
                }

                {/* Hover Popup */}
                {hoveredEarthquake && !selectedEarthquake && (
                    <Popup
                        longitude={hoveredEarthquake.geometry.coordinates[0]}
                        latitude={hoveredEarthquake.geometry.coordinates[1]}
                        closeButton={false}
                        closeOnClick={false}
                        offset={10}
                    >
                        <div className="bg-gray-200 text-black text-center text-sm">
                            {/* Get formatted date and time */}
                            {(() => {
                                const { date } = formatTimestamp(hoveredEarthquake.properties.time);

                                return <h3 className="bg-gray-400 text-center text-lg">{date}</h3>
                            })()}

                            <div className="pt-[10px] px-[5px]">
                                <p>{hoveredEarthquake.properties.mag} Magnitude</p>

                                <p className="text-center text-blue-400 py-[3px]">Click for more details</p>
                            </div>
                        </div>
                    </Popup>
                )}

                {/* Click Popup */}
                {selectedEarthquake && (
                    <DraggablePopup xPos={20} yPos={350}>
                        <div
                            className="absolute bg-white/35 w-[200px] rounded p-2 cursor-move"
                            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                        >
                            <p
                                className="absolute top-[-12px] right-[-12px] flex items-center justify-center bg-white/50 text-black
                                    w-[25px] h-[25px] border-[1px] border-gray-500 rounded-full hover:bg-slate-300 hover:text-black cursor-pointer"
                                onClick={() => setSelectedEarthquake(null)}
                            >
                                ✖
                            </p>

                            {/* Split place into two lines */}
                            {(() => {
                                const placeParts = selectedEarthquake.properties.place.split(" of ");

                                return (
                                    <h3 className="bg-gray-300 text-gray-600 text-[16px] text-center mb-[5px]">
                                        {placeParts.length > 1 ? (
                                            <>
                                                {placeParts[0]} of <br />
                                                {placeParts[1]}
                                            </>
                                        ) : (
                                            selectedEarthquake.properties.place
                                        )}
                                    </h3>
                                );
                            })()}

                            {/* Get formatted date and time */}
                            {(() => {
                                const { date, time } = formatTimestamp(selectedEarthquake.properties.time);

                                return (
                                    <>
                                        <p>{date}</p>
                                        <p>{time}</p>
                                    </>
                                );
                            })()}

                            <p>Magnitude: {selectedEarthquake.properties.mag}</p>
                            <p>Depth: {selectedEarthquake.geometry.coordinates[2]} km</p>
                        </div>
                    </DraggablePopup>
                )}

                <ScaleControl position="bottom-right" />
                <GeolocateControl position="bottom-right" />
                <NavigationControl position="bottom-right" />

                <div className="absolute top-2 right-2">
                    <EarthquakeControlPanel
                        startTime={timeRange[0]}
                        endTime={timeRange[1]}
                        selectedTime={selectedTime}
                        allDays={allDays}
                        onChangeTime={setSelectedTime}
                        onChangeAllDays={setAllDays}
                    />
                </div>

                <GridLinesGlobe
                        mapRef={mapRef}
                        interval={10}
                        visible={true}
                        equatorLineColor="#FF5733"
                        equatorLineWidth={3.0}
                        primeMeridianLineColor="#4A90E2"
                        primeMeridianLineWidth={3.0}
                    />
            </Map>
        </div>
    );
}

export default EarthquakesMap;
