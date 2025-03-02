import { LayerProps } from "react-map-gl";


// Base zip code fill color
export const zipFillLayer: LayerProps = {
    id: "zip-fill",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 6.5,
    maxzoom: 15,
    paint: {
        'fill-outline-color': 'rgba(0, 0, 255, 1.0)',
        'fill-color': 'rgba(0, 0, 255, 0.1)'
    }
};

// Highlighted zip code fill color
export const zipHighlightLayer: LayerProps = {
    id: 'zip-highlighted',
    type: 'fill',
    "source-layer": "zcta",
    minzoom: 6.5,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': '#459f9f',
        'fill-opacity': 0.9
    }
};

// Selected state fill color
export const zipSelectedLayer: LayerProps = {
    id: 'zip-selected',
    type: 'fill',
    "source-layer": "zcta",
    minzoom: 6.5,
    maxzoom: 15,
    paint: {
        'fill-outline-color': 'rgba(0, 0, 255, 1.0)',
        'fill-color': 'rgba(0, 0, 255, 0.3)'
    }
};

// Highlighted zip code fill color
export const zipLayer: LayerProps = {
    id: "zip",
    type: "line",
    "source-layer": "zcta",
    minzoom: 6.5,
    maxzoom: 15,
    paint: {
        "line-color": "rgba(0, 0, 255, 1.0)",
        "line-width": 1
    }
};