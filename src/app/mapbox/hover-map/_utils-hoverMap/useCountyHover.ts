import { useState, useCallback } from "react";
import { MapMouseEvent } from "react-map-gl";


type CountyHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    COUNTY?: string;
    STATE?: string;
} | null;


export const useCountyHover = () => {
    const [countyHoverInfo, setCountyHoverInfo] = useState<CountyHoverInfo>(null);

    const onCountyHover = useCallback((event: MapMouseEvent) => {
        const county = event.features && event.features[0];

        if (county) {
            setCountyHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ID: county.properties?.GEOID,
                COUNTY: county.properties?.NAME,
                STATE: county.properties?.STATEFP,
            });
        } else {
            setCountyHoverInfo(null);
        }
    }, []);

    return { countyHoverInfo, onCountyHover };
}
