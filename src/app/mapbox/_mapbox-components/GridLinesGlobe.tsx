import { useEffect } from "react";
import { MapRef } from "react-map-gl";
import { FeatureCollection, LineString } from "geojson";


type GridLinesProps = {
    mapRef: React.RefObject<MapRef | null>;
    visible: boolean;
    interval?: number;
    lineColor?: string;
    lineWidth?: number;
    lineOpacity?: number;
}

const generateGlobeGrid = (interval: number): FeatureCollection<LineString> => {
    const lines: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [],
    }

    // Generate longitude lines (-180° to 180°)
    for (let lon = -180; lon <= 180; lon += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: Array.from({ length: 181 }, (_, i) => [lon, i - 90]),
            },
            properties: {},
        });
    }

    // Generate latitude lines (-90° to 90°)
    for (let lat = -90; lat <= 90; lat += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, lat]),
            },
            properties: {},
        });
    }

    return lines;
}

const GridLines: React.FC<GridLinesProps> = ({
    mapRef,
    visible,
    interval = 10,
    lineColor = "#555",
    lineWidth = 1.0,
    lineOpacity = 0.7,
}) => {
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current.getMap();

        const addGridLines = () => {
            if (!map.getSource("grid-lines")) {
                map.addSource("grid-lines", {
                    type: "geojson",
                    data: generateGlobeGrid(interval),
                });

                map.addLayer({
                    id: "grid-lines",
                    type: "line",
                    source: "grid-lines",
                    layout: { "line-cap": "round" },
                    paint: {
                        "line-color": lineColor,
                        "line-width": lineWidth,
                        "line-opacity": lineOpacity,
                    },
                });
            }

            // Toggle visibility dynamically
            map.setLayoutProperty("grid-lines", "visibility", visible ? "visible" : "none");
        };

        // Wait for the style to load before adding the source and layer
        if (map.isStyleLoaded()) {
            addGridLines();
        } else {
            map.once("style.load", addGridLines);
        }

        return () => {
            if (map.getLayer("grid-lines")) {
                map.removeLayer("grid-lines");
            }
            if (map.getSource("grid-lines")) {
                map.removeSource("grid-lines");
            }
        };
    }, [mapRef, visible, interval, lineColor, lineWidth, lineOpacity]);

    return null; // This component does not render UI
}

export default GridLines;
