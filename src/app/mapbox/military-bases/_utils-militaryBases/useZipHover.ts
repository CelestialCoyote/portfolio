import { useState, useCallback } from "react";
import { MapMouseEvent } from "react-map-gl";

type ZipHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    ZCTA?: string;
    mha_name?: string;
} | null;

type MHAData = {
    mha: string;
    mha_name: string;
    zip_codes: string[];
}[];

export const useZipHover = (mhaData: MHAData) => {
    const [zipHoverInfo, setZipHoverInfo] = useState<ZipHoverInfo>(null);

    const onZipHover = useCallback((event: MapMouseEvent) => {
        const zipCode = event.features && event.features[0];

        if (zipCode) {
            const hoveredZCTA = zipCode.properties?.ZCTA5CE20;

            // Find the corresponding MHA data based on the hovered ZCTA
            const matchedMHA = mhaData.find((mha) =>
                mha.zip_codes.includes(hoveredZCTA)
            );

            // console.log(matchedMHA);

            if (matchedMHA) {
                setZipHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ID: zipCode.properties?.GEOID20,
                    ZCTA: hoveredZCTA,
                    mha_name: matchedMHA.mha_name,
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

    return { zipHoverInfo, onZipHover };
};






// import { useState, useCallback } from "react";
// import { MapMouseEvent } from "react-map-gl";


// type ZipHoverInfo = {
//     longitude: number;
//     latitude: number;
//     ID?: string,
//     ZCTA?: string,
// } | null;


// export const useZipHover = () => {
//     const [zipHoverInfo, setZipHoverInfo] = useState<ZipHoverInfo>(null);

//     const onZipHover = useCallback((event: MapMouseEvent) => {
//         const zipCode = event.features && event.features[0];

//         if (zipCode) {
//             setZipHoverInfo({
//                 longitude: event.lngLat.lng,
//                 latitude: event.lngLat.lat,
//                 ID: zipCode.properties?.GEOID20,
//                 ZCTA: zipCode.properties?.ZCTA5CE20,
//             });
//         } else {
//             setZipHoverInfo(null);
//         }
//     }, []);

//     return { zipHoverInfo, onZipHover };
// }
