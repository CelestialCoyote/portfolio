import { Source, Layer } from "react-map-gl";
import { countyFillLayer, countyHighlightLayer, countySelectedLayer } from "./map-styles-county";


export default function CountyLayers({ countyFilter, selectedCountyFilter }) {
    return (
        <Source
            type="vector"
            url="mapbox://celestialcoyote.98li4t0s"
        >
            <Layer
                beforeId="waterway-label"
                {...countyFillLayer}
            />

            <Layer
                beforeId="waterway-label"
                {...countyHighlightLayer}
                filter={countyFilter}
            />

            <Layer
                beforeId="waterway-label"
                {...countySelectedLayer}
                filter={selectedCountyFilter}
            />
        </Source>
    );
}
