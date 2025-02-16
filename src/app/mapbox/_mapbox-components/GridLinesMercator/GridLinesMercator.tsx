import { useEffect } from "react";
import { MapRef } from "react-map-gl";
import { generateGridLines, generateLabels } from "./_utils/generateGridLinesLabels";


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
    labelColor?: string;
    labelFontSize?: number;
}

const GridLines: React.FC<GridLinesProps> = ({
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
    labelColor = "#000",
    labelFontSize = 12,
}) => {
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current.getMap();

        const onStyleLoad = () => {
            if (!map.getSource("grid-lines")) {
                map.addSource("grid-lines", {
                    type: "geojson",
                    data: generateGridLines(interval),
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

                map.addSource("grid-labels", {
                    type: "geojson",
                    data: generateLabels(interval),
                });

                map.addLayer({
                    id: "grid-labels",
                    type: "symbol",
                    source: "grid-labels",
                    layout: {
                        "text-field": ["get", "label"],
                        "text-font": ["Open Sans Regular"],
                        "text-size": labelFontSize,
                        "text-anchor": "center",
                        "text-allow-overlap": true,
                        "text-offset": [0, 0.5],
                    },
                    paint: {
                        "text-color": labelColor,
                    },
                });
            }

            map.setLayoutProperty("grid-lines", "visibility", visible ? "visible" : "none");
            map.setLayoutProperty("equator-line", "visibility", visible ? "visible" : "none");
            map.setLayoutProperty("prime-meridian-line", "visibility", visible ? "visible" : "none");
            map.setLayoutProperty("grid-labels", "visibility", visible ? "visible" : "none");
        };

        map.on("load", onStyleLoad);

        return () => {
            if (map.getLayer("grid-lines")) map.removeLayer("grid-lines");
            if (map.getLayer("equator-line")) map.removeLayer("equator-line");
            if (map.getLayer("prime-meridian-line")) map.removeLayer("prime-meridian-line");
            if (map.getLayer("grid-labels")) map.removeLayer("grid-labels");
            if (map.getSource("grid-lines")) map.removeSource("grid-lines");
            if (map.getSource("grid-labels")) map.removeSource("grid-labels");

            map.off("load", onStyleLoad);
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
        primeMeridianLineWidth,
        labelColor,
        labelFontSize
    ]);

    return null;
}

export default GridLines;
