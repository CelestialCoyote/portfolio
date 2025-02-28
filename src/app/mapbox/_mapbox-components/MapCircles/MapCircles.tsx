"use client";

import React, { useState, useMemo } from "react";
import { Source, Layer } from "react-map-gl";


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
}

// Props type
interface MapCirclesProps {
    center: [number, number] | null;
}

const MapCircles: React.FC<MapCirclesProps> = ({ center }) => {
    const [radiusMiles, setRadiusMiles] = useState(25); // Default to 25 miles

    // Convert miles to meters (1 mile ≈ 1609.34 meters)
    const radiusMeters = radiusMiles * 1609.34;

    // Generate the circle when the center is selected
    const circle = useMemo(() => (
        center ? createCircle(center, radiusMeters) : null), [center, radiusMeters]
    );

    return center ? (
        <div>
            {/* Slider Control */}
            <div
                className="relative bg-white text-base w-64 text-black border-2 border-black rounded-lg p-2"
                style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
            >
                <label className="">
                    Adjust Radius: {radiusMiles} miles
                </label>
                
                <input
                    type="range"
                    className="w-full mt-1"
                    min="5"
                    max="50"
                    step="1"
                    value={radiusMiles}
                    onChange={(e) => setRadiusMiles(Number(e.target.value))}
                />
            </div>

            {/* Render the circle */}
            <Source
                id="radius-circle"
                type="geojson"
                data={{ type: "FeatureCollection", features: [circle].filter(Boolean) }}
            >
                <Layer
                    id="circle-layer"
                    type="fill"
                    paint={{
                        "fill-color": "rgba(255, 0, 0, 0.2)", // Red with transparency
                        "fill-outline-color": "rgba(255, 0, 0, 0.8)",
                    }}
                />
            </Source>
        </div>
    ) : null;
}

export default MapCircles;
