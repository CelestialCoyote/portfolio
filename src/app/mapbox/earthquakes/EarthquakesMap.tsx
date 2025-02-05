"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Map, { Layer, MapRef, Marker, Popup, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";
import { InitialViewState } from "../_mapbox-components/types/initialViewState";
import { Earthquake, FeatureCollection } from "./types/earthquakeTypes";
import { getColorByMagnitude } from "./_earthquake-utils/getColorByMagnitude";
import { filterEarthquakesByDay } from "./_earthquake-utils/filterEarthQuakesByDay";
import { formatTimestamp } from "./_earthquake-utils/formatTimeStamp";
import PlateBoundaries from "./_earthquake-components/Tectonic_Plates.json";
import ControlPanel from "./_earthquake-components/control-panel";
import Skeleton from "../map-skeleton";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState: InitialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "globe",
    zoom: 3.5,
    minZoom: 2.5,
    maxZoom: 18,
}


const EarthquakesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [earthquakes, setEarthquakes] = useState<FeatureCollection | null>(null);
    const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
    const [hoveredEarthquake, setHoveredEarthquake] = useState<Earthquake | null>(null);
    const [allDays, setAllDays] = useState(true);
    const [timeRange, setTimeRange] = useState<[number, number]>([0, 0]);
    const [selectedTime, setSelectedTime] = useState(0);


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
        };

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
        <div className="w-full h-full max-h-full">
            {loading && <Skeleton message="Loading earthquakes map..." />}

            <Map
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                mapboxAccessToken={mapboxToken}
                ref={mapRef}
                style={{ borderRadius: 8 }}
                onLoad={() => setLoading(false)}
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

                {data &&
                    data.features.map((quake) => (
                        <Marker
                            key={quake.id}
                            longitude={quake.geometry.coordinates[0]}
                            latitude={quake.geometry.coordinates[1]}
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
                    ))}

                {/* Hover Popup */}
                {hoveredEarthquake && !selectedEarthquake && (
                    <Popup
                        longitude={hoveredEarthquake.geometry.coordinates[0]}
                        latitude={hoveredEarthquake.geometry.coordinates[1]}
                        closeButton={false}
                        closeOnClick={false}
                        offset={10}
                    >
                        <div className="bg-gray-800 text-white p-1 text-sm">
                            <h3>{hoveredEarthquake.properties.place}</h3>
                            <p>Magnitude: {hoveredEarthquake.properties.mag}</p>
                            <p>{formatTimestamp(hoveredEarthquake.properties.time)}</p>
                        </div>
                    </Popup>
                )}

                {/* Click Popup */}
                {selectedEarthquake && (
                    <Popup
                        longitude={selectedEarthquake.geometry.coordinates[0]}
                        latitude={selectedEarthquake.geometry.coordinates[1]}
                        onClose={() => setSelectedEarthquake(null)}
                        closeOnClick={false}
                        offset={10}
                    >
                        <div className="bg-gray-800 text-white p-2 text-sm">
                            <h3>{selectedEarthquake.properties.place}</h3>
                            <p>Magnitude: {selectedEarthquake.properties.mag}</p>
                            <p>Depth: {selectedEarthquake.geometry.coordinates[2]} km</p>
                            <button
                                className="mt-1 px-2 py-1 bg-red-500 text-white rounded"
                                onClick={() => setSelectedEarthquake(null)}
                            >
                                Close
                            </button>
                        </div>
                    </Popup>
                )}

                <ScaleControl position="bottom-right" />
                <GeolocateControl position="bottom-right" />
                <NavigationControl position="bottom-right" />

                <div className="absolute top-4 right-4">
                    <ControlPanel
                        startTime={timeRange[0]}
                        endTime={timeRange[1]}
                        selectedTime={selectedTime}
                        allDays={allDays}
                        onChangeTime={setSelectedTime}
                        onChangeAllDays={setAllDays}
                    />
                </div>
            </Map>
        </div>
    );
}

export default EarthquakesMap;
