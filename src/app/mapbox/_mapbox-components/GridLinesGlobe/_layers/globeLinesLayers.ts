import { LayerProps } from "react-map-gl";


interface GlobeLinesLayerConfig {
    lineColor: string;
    lineWidth: number;
    equatorLineColor: string;
    equatorLineWidth: number;
    primeMeridianLineColor: string;
    primeMeridianLineWidth: number;
}

interface GlobeLabelsLayerConfig {
    labelColor?: string;
    labelFontSize?: number;
}

export const createGlobeLinesLayers = ({
    lineColor,
    lineWidth,
    equatorLineColor,
    equatorLineWidth,
    primeMeridianLineColor,
    primeMeridianLineWidth,
}: GlobeLinesLayerConfig) => {
    const globeLinesLayer: LayerProps = {
        id: "grid-lines",
        type: "line",
        layout: {
            "line-cap": "round",
        },
        paint: {
            "line-color": lineColor,
            "line-width": lineWidth,
            "line-opacity": 0.7,
        },
    }

    const equatorLineLayer: LayerProps = {
        id: "equator-line",
        type: "line",
        source: "grid-lines",
        filter: ["==", ["get", "type"], "equator"],
        layout: {
            "line-cap": "round",
        },
        paint: {
            "line-color": equatorLineColor,
            "line-width": equatorLineWidth,
            "line-opacity": 1.0,
        },
    }

    const primeMeridianLineLayer: LayerProps = {
        id: "prime-meridian-line",
        type: "line",
        source: "grid-lines",
        filter: ["==", ["get", "longitude"], 0],
        layout: {
            "line-cap": "round",
        },
        paint: {
            "line-color": primeMeridianLineColor,
            "line-width": primeMeridianLineWidth,
            "line-opacity": 1.0,
        },
    }

    return { globeLinesLayer, equatorLineLayer, primeMeridianLineLayer };
}

export const createGlobeLabelsLayers = ({
    labelColor,
    labelFontSize
}: GlobeLabelsLayerConfig) => {
    const globeLabelsLayer: LayerProps = {
        id: "globe-labels",
        type: "symbol",
        source: "globe-labels",
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
    }

    return { globeLabelsLayer };
}





// import { LayerProps } from "react-map-gl";


// interface GridLinesLayerConfig {
//     lineColor: string;
//     lineWidth: number;
//     equatorLineColor: string;
//     equatorLineWidth: number;
//     primeMeridianLineColor: string;
//     primeMeridianLineWidth: number;
// }


// export const createGridLinesLayers = ({
//     lineColor,
//     lineWidth,
//     equatorLineColor,
//     equatorLineWidth,
//     primeMeridianLineColor,
//     primeMeridianLineWidth,
// }: GridLinesLayerConfig) => {
//     const gridLinesLayer: LayerProps = {
//         id: "grid-lines",
//         type: "line",
//         layout: {
//             "line-cap": "round",
//         },
//         paint: {
//             "line-color": lineColor,
//             "line-width": lineWidth,
//             "line-opacity": 0.7,
//         },
//     }

//     const equatorLineLayer: LayerProps = {
//         id: "equator-line",
//         type: "line",
//         source: "grid-lines",
//         filter: ["==", ["get", "type"], "equator"],
//         layout: {
//             "line-cap": "round",
//         },
//         paint: {
//             "line-color": equatorLineColor,
//             "line-width": equatorLineWidth,
//             "line-opacity": 1.0,
//         },
//     }

//     const primeMeridianLineLayer: LayerProps = {
//         id: "prime-meridian-line",
//         type: "line",
//         source: "grid-lines",
//         filter: ["==", ["get", "longitude"], 0],
//         layout: {
//             "line-cap": "round",
//         },
//         paint: {
//             "line-color": primeMeridianLineColor,
//             "line-width": primeMeridianLineWidth,
//             "line-opacity": 1.0,
//         },
//     }

//     return { gridLinesLayer, equatorLineLayer, primeMeridianLineLayer };
// }
