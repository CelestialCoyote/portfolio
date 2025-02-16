import React, { useMemo } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import { generateGlobeLines, generateGlobeLabels } from "./_utils/generateGlobeLinesLabels";
import { createGlobeLinesLayers, createGlobeLabelsLayers } from "./_layers/globeLinesLayers";


type GlobeLinesProps = {
    mapRef: React.RefObject<MapRef | null>;
    visible: boolean;
    interval?: number;
    equatorLineColor?: string;
    equatorLineWidth?: number;
    primeMeridianLineColor?: string;
    primeMeridianLineWidth?: number;
    labelColor?: string;
    labelFontSize?: number;
}

const GlobeGridLines: React.FC<GlobeLinesProps> = ({
    visible,
    interval = 10,
    equatorLineColor = "#FF5733",
    equatorLineWidth = 3.0,
    primeMeridianLineColor = "#4A90E2",
    primeMeridianLineWidth = 3.0,
}) => {
    const globeLinesData = useMemo(() => generateGlobeLines(interval), [interval]);
    const globeLabelsData = useMemo(() => generateGlobeLabels(interval), [interval]);

    if (!visible) return null;

    const { globeLinesLayer, equatorLineLayer, primeMeridianLineLayer } = createGlobeLinesLayers({
        lineColor: "#555",
        lineWidth: 1.0,
        equatorLineColor,
        equatorLineWidth,
        primeMeridianLineColor,
        primeMeridianLineWidth,
    });

    const { globeLabelsLayer } = createGlobeLabelsLayers({
            labelColor: "#FFF",
            labelFontSize: 14,
        });

    return (
        <>
            <Source id="grid-lines" type="geojson" data={globeLinesData}>
                <Layer {...globeLinesLayer} />
                <Layer {...equatorLineLayer} />
                <Layer {...primeMeridianLineLayer} />
            </Source>

            <Source id="grid-labels" type="geojson" data={globeLabelsData}>
                <Layer {...globeLabelsLayer} />
            </Source>
        </>
    );
}

export default GlobeGridLines;
