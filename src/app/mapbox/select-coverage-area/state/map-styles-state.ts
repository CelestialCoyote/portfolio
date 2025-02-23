import { LayerProps } from "react-map-gl"


// Base state fill color
export const stateFillLayer: LayerProps = {
    id: "state-fill",
    type: "fill",
    source: "states",
    "source-layer": "state",
    paint: {
        'fill-outline-color': 'rgba(255, 0, 0, 1.0)',
        'fill-color': 'rgba(255, 0, 0, 0.1)'
    }
} as LayerProps;

// Hovered state fill color
export const stateHighlightLayer: LayerProps = {
    id: 'state-highlighted',
    type: 'fill',
    source: "states",
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': '#459f9f',
        'fill-opacity': 0.9
    }
} as LayerProps;

// Selected state fill color
export const stateSelectedLayer: LayerProps = {
    id: 'state-selected',
    type: 'fill',
    source: "states",
    "source-layer": "state",
    paint: {
        'fill-outline-color': 'rgba(0, 128, 0, 1.0)',
        'fill-color': 'rgba(0, 128, 0, 0.6)',
        'fill-opacity': 0.8
    }
} as LayerProps;

// Outline state only layer.
export const stateLayer: LayerProps = {
    id: "state",
    type: "line",
    source: "states",
    "source-layer": "state",
    paint: {
        "line-color": "rgba(255, 0, 0, 1.0)",
        "line-width": 1
    }
} as LayerProps;
