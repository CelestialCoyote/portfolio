import { Layer, LayerProps, Source } from "react-map-gl";


interface StateLayersProps {
    stateFilter: string[];
    selectedStateFilter: string[];
}

// Base state fill color
const stateFillLayer: LayerProps = {
    id: "state-fill",
    type: "fill",
    source: "states",
    "source-layer": "state",
    paint: {
        'fill-outline-color': 'rgba(255, 0, 0, 1.0)',
        'fill-color': 'transparent'
    }
}

// Hovered state fill color
// const stateHighlightLayer: LayerProps = {
//     id: 'state-highlighted',
//     type: 'fill',
//     source: "states",
//     "source-layer": "state",
//     paint: {
//         "fill-outline-color": "rgba(0, 0, 0, 1.0)",
//         'fill-color': '#459f9f',
//         'fill-opacity': 0.9
//     }
// }

// Selected state fill color
const stateSelectedLayer: LayerProps = {
    id: 'state-selected',
    type: 'fill',
    source: "states",
    "source-layer": "state",
    paint: {
        'fill-outline-color': 'rgba(0, 128, 0, 1.0)',
        'fill-color': 'rgba(0, 128, 0, 0.6)',
        'fill-opacity': 0.8
    }
}

// Outline state only layer.
const stateOutlineLayer: LayerProps = {
    id: "state",
    type: "line",
    source: "states",
    "source-layer": "state",
    paint: {
        "line-color": "rgba(255, 0, 0, 1.0)",
        "line-width": 1
    }
}


const StateLayers: React.FC<StateLayersProps> = ({ stateFilter, selectedStateFilter }) => {
    return (
        <Source
            type="vector"
            url="mapbox://celestialcoyote.98li4t0s"
        >
            <Layer
                beforeId="waterway-label"
                {...stateFillLayer}
            />

            <Layer
                beforeId="waterway-label"
                // {...stateHighlightLayer}
                {...stateOutlineLayer}
                filter={stateFilter}
            />

            <Layer
                beforeId="waterway-label"
                {...stateSelectedLayer}
                filter={selectedStateFilter}
            />
        </Source>
    );
}

export default StateLayers;
