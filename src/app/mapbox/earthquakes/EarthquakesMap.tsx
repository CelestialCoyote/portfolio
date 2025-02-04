"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Map, { Layer, MapRef, Marker, Popup, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map-popup.module.css";

// import TectonicPlates from "./_earthquake-components/TectonicPlateBoundaries.json";
import PlateBoundaries from "./_earthquake-components/Tectonic_Plates.json";
import ControlPanel from "./_earthquake-components/control-panel";
import Skeleton from "../map-skeleton";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface InitialViewState {
    longitude: number;
    latitude: number;
    projection: string;
    zoom: number;
    minZoom: number;
    maxZoom: number;
}

const initialViewState: InitialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "globe",
    zoom: 3.5,
    minZoom: 2.5,
    maxZoom: 18,
}

interface Earthquake {
    id: string;
    properties: {
        mag: number;
        place: string;
        time: number; // Timestamp
    };
    geometry: {
        coordinates: [number, number, number]; // [longitude, latitude, depth]
    };
}

interface FeatureCollection {
    type: "FeatureCollection";
    features: Earthquake[];
}

const filterFeaturesByDay = (
    featureCollection: FeatureCollection,
    time: number
): FeatureCollection => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const filteredFeatures = featureCollection.features.filter((feature) => {
        const featureDate = new Date(feature.properties.time);
        return (
            featureDate.getFullYear() === year &&
            featureDate.getMonth() === month &&
            featureDate.getDate() === day
        );
    });

    return { type: "FeatureCollection", features: filteredFeatures };
}

const EarthquakesMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [loading, setLoading] = useState(true);
    const [earthquakes, setEarthquakes] = useState<FeatureCollection | null>(null);
    const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
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
        return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
    }, [earthquakes, allDays, selectedTime]);

    if (!mapboxToken) {
        console.error("Mapbox token is missing. Check your environment variables.");
        return (
            <div className="text-red-500 text-center mt-10">
                Error: Mapbox token not found.
            </div>
        );
    }

    const getColorByMagnitude = (mag: number) => {
        const colors = [
            { mag: 2.0, color: "green" },
            { mag: 3.0, color: "#88C057" },
            { mag: 4.0, color: "yellow" },
            { mag: 5.0, color: "#FFC100" },
            { mag: 6.0, color: "orange" },
            { mag: 7.0, color: "#FF4500" },
            { mag: 8.0, color: "red" },
            { mag: 9.0, color: "#B22222" },
        ];

        for (let i = colors.length - 1; i >= 0; i--) {
            if (mag >= colors[i].mag) {
                return colors[i].color;
            }
        }
        return "green";
    };

    return (
        <div className="flex flex-row w-full h-full max-h-full gap-x-4">
            {loading && <Skeleton message="Loading earthquakes map..." />}

            <Map
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                mapboxAccessToken={mapboxToken}
                ref={mapRef}
                style={{ borderRadius: 8 }}
                onLoad={() => setLoading(false)}
            >
                {/* <Source id="tectonic-plates-source" type="geojson" data={TectonicPlates}>
                    <Layer
                        id="tectonic-plates-layer"
                        type="line"
                        paint={{
                            "line-color": "#FF5733",
                            "line-width": 2,
                        }}
                    />
                </Source> */}

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
                            ></div>
                        </Marker>
                    ))}

                {selectedEarthquake && (
                    <Popup
                        longitude={selectedEarthquake.geometry.coordinates[0]}
                        latitude={selectedEarthquake.geometry.coordinates[1]}
                        onClose={() => setSelectedEarthquake(null)}
                        closeOnClick={false}
                    >
                        <div className="bg-slate-400 text-black p-1">
                            <h3>{selectedEarthquake.properties.place}</h3>
                            <p>Magnitude: {selectedEarthquake.properties.mag}</p>
                            <p>Depth: {selectedEarthquake.geometry.coordinates[2]} km</p>
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
