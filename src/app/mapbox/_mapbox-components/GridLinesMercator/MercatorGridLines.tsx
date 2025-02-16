import React, { useMemo } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import { generateGridLines, generateGridLabels } from "./_utils/generateGridLinesLabels";
import { createGridLinesLayers, createGridLabelsLayers } from "./_layers/gridLinesLayers";


type GridLinesProps = {
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

const MercatorGridLines: React.FC<GridLinesProps> = ({
    visible,
    interval = 10,
    equatorLineColor = "#FF5733",
    equatorLineWidth = 3.0,
    primeMeridianLineColor = "#4A90E2",
    primeMeridianLineWidth = 3.0,
}) => {
    const gridLinesData = useMemo(() => generateGridLines(interval), [interval]);
    const gridLabelsData = useMemo(() => generateGridLabels(interval), [interval]);

    if (!visible) return null;

    const { gridLinesLayer, equatorLineLayer, primeMeridianLineLayer } = createGridLinesLayers({
        lineColor: "#555",
        lineWidth: 1.0,
        equatorLineColor,
        equatorLineWidth,
        primeMeridianLineColor,
        primeMeridianLineWidth,

    });

    const { gridLabelsLayer } = createGridLabelsLayers({
        labelColor: "#000",
        labelFontSize: 12,
    });

    return (
        <>
            <Source id="grid-lines" type="geojson" data={gridLinesData}>
                <Layer {...gridLinesLayer} />
                <Layer {...equatorLineLayer} />
                <Layer {...primeMeridianLineLayer} />
            </Source>

            <Source id="grid-labels" type="geojson" data={gridLabelsData}>
                <Layer {...gridLabelsLayer} />
            </Source>
        </>
    );
}

export default MercatorGridLines;
