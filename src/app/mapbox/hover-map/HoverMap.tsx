"use client";

import React, { useCallback, useState } from "react";
import Map, { MapMouseEvent} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";
import { mapboxToken } from "../_mapbox-components/mapboxToken";
import { initialViewState } from "./_utils-hoverMap/initialViewState";

import SelectAreaType from "./_components-hoverMap/SelectAreaType";
import StateLayers from "./_components-hoverMap/StateLayers";
import { useStateHover } from "./_utils-hoverMap/useStateHover";
import CountyLayers from "./_components-hoverMap/CountyLayers";
import { useCountyHover } from "./_utils-hoverMap/useCountyHover";
import ZipLayers from "./_components-hoverMap/ZipCodeLayers";
import { useZipHover } from "./_utils-hoverMap/useZipHover";


const HoverMap: React.FC = () => {
    const [selectAreaType, setSelectAreaType] = useState("state");
    const [isHoveringControl, setIsHoveringControl] = useState(false);

    const { stateHoverInfo, onStateHover } = useStateHover();
    const { countyHoverInfo, onCountyHover } = useCountyHover();
    const { zipHoverInfo, onZipHover } = useZipHover();


    const onHover = useCallback(
        (event: MapMouseEvent) => {
            if (selectAreaType === "state") {
                onStateHover(event);
            } else if (selectAreaType === "county") {
                onCountyHover(event);
            } else if (selectAreaType === "zip") {
                onZipHover(event);
            }
        },
        [selectAreaType, onStateHover, onCountyHover, onZipHover]
    );

    return (
        <div className="flex flex-grow w-full h-full max-h-full">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken={mapboxToken}
                onMouseMove={onHover}
                interactiveLayerIds={["states", "counties", "zipCodes"]}
            >
                {selectAreaType == "state" && !isHoveringControl &&
                    <StateLayers stateHoverInfo={stateHoverInfo} />
                }

                {selectAreaType == "county" && !isHoveringControl &&
                    <CountyLayers countyHoverInfo={countyHoverInfo} />
                }

                {selectAreaType == "zip" && !isHoveringControl &&
                    <ZipLayers zipHoverInfo={zipHoverInfo} />
                }

                <div
                    className="absolute top-6 left-6"
                    onMouseEnter={() => { setIsHoveringControl(true); }}
                    onMouseLeave={() => setIsHoveringControl(false)}
                >
                    <SelectAreaType
                        selectAreaType={selectAreaType}
                        setSelectAreaType={setSelectAreaType}
                    />
                </div>
            </Map>
        </div>
    );
}

export default HoverMap;
