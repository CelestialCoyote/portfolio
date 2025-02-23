"use client";

import { useCallback, useRef, useState } from "react";
import Map, { MapMouseEvent, MapRef } from "react-map-gl";
import { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import ZoomLevelDisplay from "../_mapbox-components/ZoomLevelDisplay";
import SelectionAreaType from "./components/selection-area-type";
import "mapbox-gl/dist/mapbox-gl.css";
import "../_mapbox-components/map-popup.css";

import { initialViewState } from "./_utils/initialViewState";
import { mapboxToken } from "../_mapbox-components/mapboxToken";

import StateLayers from "./state/layers-state";
import { useStateHandlers } from "./state/selection-handlers-state";
import { StateHoverPopup, SelectedStatesPopup } from "./state/selection-handlers-state";

import CountyLayers from "./county/layers-county";
import { useCountyHandlers } from "./county/selection-handlers-county";
import { CountyHoverPopup, SelectedCountyPopup } from "./county/selection-handlers-county";

import ZipCodeLayers from "./zip-code/layers-zip-code";
import { useZipCodeHandlers } from "./zip-code/selection-handlers-zip-code";
import { ZipHoverPopup, SelectedZipCodesPopup } from "./zip-code/selection-handlers-zip-code";


interface StateHoverInfo {
    STATE: string;
    longitude: number;
    latitude: number;
}

interface CountyHoverInfo {
    ID: string;
}

interface ZipHoverInfo {
    ZIP: string;
}


const SelectCoverageAreaMap: React.FC = () => {
    const mapRef = useRef<MapRef>(null);
    const [mapStyle] = useState("mapbox://styles/mapbox/light-v11");
    const [selectAreaType, setSelectAreaType] = useState("state");

    // useState, filter and functions for state selections
    const [stateHoverInfo, setStateHoverInfo] = useState<StateHoverInfo | null>(null);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';

    const { onStateHover, onStateClick, stateFilter, selectedStateFilter } =
        useStateHandlers({ setStateHoverInfo, setSelectedStates, selectedStates, hoverState });

    // useState, filter and functions for county selections
    const [countyHoverInfo, setCountyHoverInfo] = useState<CountyHoverInfo | null>(null);
    const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
    const hoverCounty = (countyHoverInfo && countyHoverInfo.ID) || '';

    const { onCountyHover, onCountyClick, countyFilter, selectedCountyFilter } =
        useCountyHandlers({ setCountyHoverInfo, setSelectedCounties, selectedCounties, hoverCounty });

    // useState, filter and functions for zip code selections
    const [zipHoverInfo, setZipHoverInfo] = useState<ZipHoverInfo | null>(null);
    const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
    const hoverZip = (zipHoverInfo && zipHoverInfo.ZIP) || '';

    const { onZipHover, onZipClick, zipFilter, selectedZipFilter } =
        useZipCodeHandlers({ setZipHoverInfo, setSelectedZipCodes, selectedZipCodes, hoverZip });


    // Decide hover behavior based on selectAreaType
    const onHover = useCallback(
        (event: MapMouseEvent) => {
            if (selectAreaType === "state") {
                onStateHover(event);
            } else if (selectAreaType === "county") {
                onCountyHover(event);
            } else if (selectAreaType === "zip") {
                onZipHover(event);
            };
        },
        [selectAreaType, onStateHover, onCountyHover, onZipHover]
    );

    // Decide hover behavior based on selectAreaType
    const onClickArea = useCallback(
        (event: MapMouseEvent) => {
            if (selectAreaType === "state") {
                onStateClick(event);
            } else if (selectAreaType === "county") {
                onCountyClick(event);
            } else if (selectAreaType === "zip") {
                onZipClick(event);
            };
        },
        [selectAreaType, onStateClick, onCountyClick, onZipClick]
    );

    return (
        <div className="flex w-full h-full">
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={["state-fill", "county-fill", "zip-fill"]}
                onMouseMove={onHover}
                onClick={onClickArea}
                style={{ borderRadius: 8 }}
            >
                {/* Show state layers if selected */}
                {selectAreaType == "state" && (
                    <StateLayers
                        stateFilter={stateFilter}
                        selectedStateFilter={selectedStateFilter}
                    />
                )}

                {/* Show county layers if selected */}
                {selectAreaType == "county" && (
                    <CountyLayers
                        countyFilter={countyFilter}
                        selectedCountyFilter={selectedCountyFilter}
                    />
                )}

                {/* Show zip code layers if selected */}
                {selectAreaType == "zip" && (
                    <ZipCodeLayers
                        zipFilter={zipFilter}
                        selectedZipFilter={selectedZipFilter}
                    />
                )}

                {/* Native Mapbox controls. */}
                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl position="bottom-right" />

                {/* Custom controls - shows current zoom level */}
                <div className="absolute top-6 left-0 right-0">
                    <ZoomLevelDisplay
                        mapRef={mapRef}
                        initialViewState={initialViewState}
                    />
                </div>

                {/* Custom control - choose which area type to select state, county, or zip */}
                <div className="absolute top-6 left-6">
                    <SelectionAreaType
                        selectAreaType={selectAreaType}
                        setSelectAreaType={setSelectAreaType}
                    />
                </div>

                {/* Popup for hovered state */}
                <StateHoverPopup
                    hoverState={hoverState}
                    stateHoverInfo={stateHoverInfo}
                />

                {/* Draggable window for selected states */}
                <SelectedStatesPopup
                    selectAreaType={selectAreaType}
                    selectedStates={selectedStates}
                />

                {/* Popup for hovered county */}
                <CountyHoverPopup
                    hoverCounty={hoverCounty}
                    countyHoverInfo={countyHoverInfo}
                />

                {/* Draggable window for selected counties */}
                <SelectedCountyPopup
                    selectAreaType={selectAreaType}
                    selectedCounties={selectedCounties}
                />

                {/* Popup for hovered zip code */}
                <ZipHoverPopup
                    hoverZip={hoverZip}
                    zipHoverInfo={zipHoverInfo}
                />

                {/* Draggable window for selected zip codes */}
                <SelectedZipCodesPopup
                    selectAreaType={selectAreaType}
                    selectedZipCodes={selectedZipCodes}
                />
            </Map>
        </div>
    );
}

export default SelectCoverageAreaMap;
