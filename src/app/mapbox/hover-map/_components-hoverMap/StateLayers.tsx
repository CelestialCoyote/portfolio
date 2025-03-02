import React, { useMemo } from "react";
import { Layer, LayerProps, Popup, Source } from "react-map-gl";


type StateHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    STATEFP?: string,
    NAME?: string;
} | null;

type StateLayersProps = {
    stateHoverInfo: StateHoverInfo;
}

const statesLayer: LayerProps = {
    id: "states",
    type: "fill",
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 0.2)",
        "fill-color": "rgba(0, 255, 0, 0.1)",
    },
}

const stateHighlightLayer: LayerProps = {
    id: 'state-highlighted',
    type: 'fill',
    "source-layer": "state",
    paint: {
        "fill-outline-color": "#484896",
        "fill-color": "#6e599f",
        "fill-opacity": 0.75,
    },
}

const StateLayers: React.FC<StateLayersProps> = ({ stateHoverInfo }) => {
    const stateFilter = useMemo(() => {
        if (stateHoverInfo?.ID) {
            return ["in", "STATEFP", stateHoverInfo.ID]; // Highlight county by NAME
        }
        return ["==", "STATEFP", ""]; // Default filter
    }, [stateHoverInfo]);

    return (
        <>
            <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                <Layer beforeId="waterway-label" {...statesLayer} />

                <Layer beforeId="waterway-label" {...stateHighlightLayer} filter={stateFilter} />
            </Source>

            {stateHoverInfo && (
                <Popup
                    offset={25}
                    anchor="bottom"
                    latitude={stateHoverInfo.latitude}
                    longitude={stateHoverInfo.longitude}
                    closeButton={false}
                    closeOnClick={false}
                >
                    <div className="w-[128px]">
                        <h3 className="text-black text-center">
                            State:
                        </h3>

                        <div className="flex flex-col bg-slate-200 text-black rounded-b-lg px-2 py-1">
                            <p className="text-center font-bold">
                                {stateHoverInfo.NAME}
                            </p>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default StateLayers;
