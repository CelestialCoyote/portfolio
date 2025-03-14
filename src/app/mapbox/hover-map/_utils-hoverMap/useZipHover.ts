import { useState, useCallback } from "react";
import { MapMouseEvent } from "react-map-gl";


type ZipHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string,
    ZCTA?: string,
} | null;


export const useZipHover = () => {
    const [zipHoverInfo, setZipHoverInfo] = useState<ZipHoverInfo>(null);

    const onZipHover = useCallback((event: MapMouseEvent) => {
        const zipCode = event.features && event.features[0];

        if (zipCode) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ID: zipCode.properties?.GEOID20,
                ZCTA: zipCode.properties?.ZCTA5CE20,
            });
        } else {
            setZipHoverInfo(null);
        }
    }, []);

    return { zipHoverInfo, onZipHover };
}
