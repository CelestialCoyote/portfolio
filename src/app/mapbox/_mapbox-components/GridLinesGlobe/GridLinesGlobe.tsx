import { useEffect } from "react";
import { MapRef } from "react-map-gl";
import { generateGlobeLines } from "./_utils/generateGlobeLinesLabels";


type GridLinesProps = {
    mapRef: React.RefObject<MapRef | null>;
    visible: boolean;
    interval?: number;
    lineColor?: string;
    lineWidth?: number;
    lineOpacity?: number;
    equatorLineColor?: string;
    equatorLineWidth?: number;
    primeMeridianLineColor?: string;
    primeMeridianLineWidth?: number;
}


const GridLinesGlobe: React.FC<GridLinesProps> = ({
    mapRef,
    visible,
    interval = 10,
    lineColor = "#555",
    lineWidth = 1.0,
    lineOpacity = 0.7,
    equatorLineColor = "#FF5733",
    equatorLineWidth = 3.0,
    primeMeridianLineColor = "#4A90E2",
    primeMeridianLineWidth = 3.0,
}) => {
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current.getMap();

        const addGridLines = () => {
            if (!map.getSource("grid-lines")) {
                map.addSource("grid-lines", {
                    type: "geojson",
                    data: generateGlobeLines(interval),
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

                map.addLayer({
                    id: "equator-line",
                    type: "line",
                    source: "grid-lines",
                    filter: ["==", ["get", "type"], "equator"],
                    layout: { "line-cap": "round" },
                    paint: {
                        "line-color": equatorLineColor,
                        "line-width": equatorLineWidth,
                        "line-opacity": lineOpacity,
                    },
                });

                map.addLayer({
                    id: "prime-meridian-line",
                    type: "line",
                    source: "grid-lines",
                    filter: ["==", ["get", "longitude"], 0],
                    layout: { "line-cap": "round" },
                    paint: {
                        "line-color": primeMeridianLineColor,
                        "line-width": primeMeridianLineWidth,
                        "line-opacity": lineOpacity,
                    },
                });
            }

            // Toggle visibility dynamically
            map.setLayoutProperty("grid-lines", "visibility", visible ? "visible" : "none");
            map.setLayoutProperty("equator-line", "visibility", visible ? "visible" : "none");
            map.setLayoutProperty("prime-meridian-line", "visibility", visible ? "visible" : "none");
        };

        // Wait for the style to load before adding the source and layer
        if (map.isStyleLoaded()) {
            addGridLines();
        } else {
            map.once("style.load", addGridLines);
        }

        return () => {
            if (map.getLayer("grid-lines")) map.removeLayer("grid-lines");
            if (map.getLayer("equator-line")) map.removeLayer("equator-line");
            if (map.getLayer("prime-meridian-line")) map.removeLayer("prime-meridian-line");
            if (map.getSource("grid-lines")) map.removeSource("grid-lines");
        };
    }, [
        mapRef,
        visible,
        interval,
        lineColor,
        lineWidth,
        lineOpacity,
        equatorLineColor,
        equatorLineWidth,
        primeMeridianLineColor,
        primeMeridianLineWidth
    ]);

    return null; // This component does not render UI
}

export default GridLinesGlobe;
