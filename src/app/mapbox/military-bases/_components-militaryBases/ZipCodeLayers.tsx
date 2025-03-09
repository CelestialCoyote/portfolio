import React, { useMemo } from "react";
import { Layer, LayerProps, Popup, Source } from "react-map-gl";


type ZipHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    ZCTA?: string;
    mha_name?: string;
    mha?: string;
} | null;

type ZipLayersProps = {
    zipHoverInfo: ZipHoverInfo;
}

const zipLayer: LayerProps = {
    id: "zipCodes",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 6,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 0.2)",
        "fill-color": "rgba(0, 255, 0, 0.1)",
    },
}

const zipHighlightLayer: LayerProps = {
    id: 'zip-highlighted',
    type: 'fill',
    "source-layer": "zcta",
    minzoom: 6,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "#484896",
        "fill-color": "#6e599f",
        "fill-opacity": 0.75,
    },
}

const ZipLayers: React.FC<ZipLayersProps> = ({ zipHoverInfo }) => {
    const zipFilter = useMemo(() => {
        if (zipHoverInfo?.ID) {
            return ["in", "GEOID20", zipHoverInfo.ID]; // Highlight county by zip
        }
        return ["==", "GEOID20", ""]; // Default filter
    }, [zipHoverInfo]);

    return (
        <>
            <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                <Layer beforeId="waterway-label" {...zipLayer} />

                <Layer beforeId="waterway-label" {...zipHighlightLayer} filter={zipFilter} />
            </Source>

            {zipHoverInfo && (
                <Popup
                    offset={25}
                    anchor="bottom"
                    latitude={zipHoverInfo.latitude}
                    longitude={zipHoverInfo.longitude}
                    closeButton={false}
                    closeOnClick={false}
                >
                    <div className="w-[172px]">
                        <h3 className="text-black text-center text-[14px] font-bold">
                            Housing Allowance Info
                        </h3>

                        <div className="flex flex-col bg-slate-200 text-black rounded-b-lg px-2 py-1">
                            <p className="text-center font-bold">
                                Zip Code:<span className="font-normal ml-1">{zipHoverInfo.ZCTA}</span>
                            </p>

                            <p className="text-center font-bold">
                                MHA ID:<span className="font-normal ml-1">{zipHoverInfo.mha}</span>
                            </p>

                            <p className="">
                                {zipHoverInfo.mha_name}
                            </p>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default ZipLayers;
