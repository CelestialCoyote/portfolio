import React, { useMemo } from "react";
import { Layer, LayerProps, Popup, Source } from "react-map-gl";


type CountyHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    COUNTY?: string;
    STATE?: string;
} | null;

type CountyLayersProps = {
    countyHoverInfo: CountyHoverInfo;
}

const countiesLayer: LayerProps = {
    id: "counties",
    type: "fill",
    "source-layer": "county",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 0.2)",
        "fill-color": "rgba(0, 255, 0, 0.1)",
    },
}

const highlightLayer: LayerProps = {
    id: "counties-highlighted",
    type: "fill",
    "source-layer": "county",
    paint: {
        "fill-outline-color": "#484896",
        "fill-color": "#6e599f",
        "fill-opacity": 0.75,
    },
}

const CountyLayers: React.FC<CountyLayersProps> = ({ countyHoverInfo }) => {
    const countyFilter = useMemo(() => {
        if (countyHoverInfo?.ID) {
            return ["in", "GEOID", countyHoverInfo.ID]; // Highlight county by GEOID
        }
        return ["==", "GEOID", ""]; // Default filter
    }, [countyHoverInfo]);

    return (
        <>
            <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                <Layer beforeId="waterway-label" {...countiesLayer} />
                <Layer beforeId="waterway-label" {...highlightLayer} filter={countyFilter} />
            </Source>

            {countyHoverInfo && (
                <Popup
                    offset={25}
                    anchor="bottom"
                    latitude={countyHoverInfo.latitude}
                    longitude={countyHoverInfo.longitude}
                    closeButton={false}
                    closeOnClick={false}
                >
                    <div className="w-[128px]">
                        <h3 className="text-black text-center">County:</h3>
                        <div className="flex flex-col bg-slate-200 text-black rounded-b-lg px-2 py-1">
                            <p className="text-center font-bold">
                                {countyHoverInfo.COUNTY}
                            </p>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default CountyLayers;
