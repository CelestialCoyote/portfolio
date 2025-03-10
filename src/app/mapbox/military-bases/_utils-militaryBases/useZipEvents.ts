import { useState, useCallback } from "react";
import { MapMouseEvent } from "react-map-gl";
import { MHAData, ZipClickedInfo, ZipHoverInfo } from "../_types-militaryBases/militaryBasesTypes"


export const useZipEvents = (mhaData: MHAData) => {
    const [zipHoverInfo, setZipHoverInfo] = useState<ZipHoverInfo>(null);
    const [zipClickedInfo, setZipClickedInfo] = useState<ZipClickedInfo>(null);

    const onZipHover = useCallback((event: MapMouseEvent) => {
        const zipCode = event.features && event.features[0];

        if (zipCode) {
            const hoveredZCTA = zipCode.properties?.ZCTA5CE20;

            // Find the corresponding MHA data based on the hovered ZCTA
            const matchedMHA = mhaData.find((mha) =>
                mha.zip_codes.includes(hoveredZCTA)
            );

            if (matchedMHA) {
                setZipHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ID: zipCode.properties?.GEOID20,
                    ZCTA: hoveredZCTA,
                    mha_name: matchedMHA.mha_name,
                    mha: matchedMHA.mha,
                });
            } else {
                setZipHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ID: zipCode.properties?.GEOID20,
                    ZCTA: hoveredZCTA,
                });
            }
        } else {
            setZipHoverInfo(null);
        }
    }, [mhaData]);

    const onZipClick = useCallback((event: MapMouseEvent) => {
        const zipCode = event.features && event.features[0];

        if (zipCode) {
            const clickedZCTA = zipCode.properties?.ZCTA5CE20;

            // Find the corresponding MHA data based on the hovered ZCTA
            const matchedMHA = mhaData.find((mha) =>
                mha.zip_codes.includes(clickedZCTA)
            );

            if (matchedMHA) {
                setZipClickedInfo({
                    ZCTA: clickedZCTA,
                    mha_name: matchedMHA.mha_name,
                    mha: matchedMHA.mha,
                    bah: matchedMHA.bah
                });
            }
        }
    }, [mhaData]);

    return { zipHoverInfo, onZipHover, onZipClick, zipClickedInfo, setZipClickedInfo };
}
