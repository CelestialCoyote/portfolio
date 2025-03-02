import { useState, useCallback } from "react";
import { MapMouseEvent } from "react-map-gl";


type StateHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    NAME?: string;
} | null;


export const useStateHover = () => {
    const [stateHoverInfo, setStateHoverInfo] = useState<StateHoverInfo>(null);

    const onStateHover = useCallback((event: MapMouseEvent) => {
        const state = event.features && event.features[0];

        if (state) {
            setStateHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ID: state.properties?.GEOID,
                NAME: state.properties?.NAME,
            });
        } else {
            setStateHoverInfo(null);
        }
    }, []);

    return { stateHoverInfo, onStateHover };
}
