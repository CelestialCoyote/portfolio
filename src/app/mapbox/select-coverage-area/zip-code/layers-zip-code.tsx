import { Source, Layer } from "react-map-gl";
import { zipFillLayer, zipHighlightLayer, zipSelectedLayer } from "./map-styles-zip-code";


export default function ZipCodeLayers({ zipFilter, selectedZipFilter }) {
    return (
        <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
            <Layer
                id="zip-fill"
                beforeId="waterway-label"
                {...zipFillLayer}
            />

            <Layer
                id="zip-highlight"
                beforeId="waterway-label"
                {...zipHighlightLayer}
                filter={zipFilter}
            />

            <Layer
                id="zip-selected"
                beforeId="waterway-label"
                {...zipSelectedLayer}
                filter={selectedZipFilter}
            />
        </Source>
    );
}
