import { useCallback } from "react";
import { MapMouseEvent, Popup } from "react-map-gl";


interface ZipHoverInfo {
    longitude: number;
    latitude: number;
    ZIP: string;
}

interface UseZipCodeHandlersProps {
    setZipHoverInfo: (info: ZipHoverInfo | null) => void;
    setSelectedZipCodes: React.Dispatch<React.SetStateAction<string[]>>;
    selectedZipCodes: string[];
    hoverZip: string;
}


export const useZipCodeHandlers = ({
    setZipHoverInfo,
    setSelectedZipCodes,
    selectedZipCodes,
    hoverZip
}: UseZipCodeHandlersProps) => {
    // Handle hover effect for ZIP codes
    const onZipHover = useCallback((event: MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
        const zip = event.features?.[0];
        const zipNumber = zip?.properties?.ZCTA5CE20 as string; // Ensure it's a string

        if (zipNumber) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ZIP: zipNumber,
            });
        } else {
            setZipHoverInfo(null);
        }
    }, [setZipHoverInfo]);

    // Handle state click for selecting/deselecting
    const onZipClick = useCallback((event: MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
        const zip = event.features?.[0];
        const zipNumber = zip?.properties?.ZCTA5CE20 as string;

        if (zipNumber) {
            setSelectedZipCodes((prevSelected) =>
                prevSelected.includes(zipNumber)
                    ? prevSelected.filter((zip) => zip !== zipNumber)
                    : [...prevSelected, zipNumber]
            );
        }
    }, [setSelectedZipCodes]);

    // Filter for highlighted zip (on hover)
    const zipFilter = useCallback(() => ["==", "ZCTA5CE20", hoverZip], [hoverZip]);
    
    // Filter for selected states
    const selectedZipFilter = useCallback(() => ["in", "ZCTA5CE20", ...selectedZipCodes], [selectedZipCodes]);

    return { onZipHover, onZipClick, zipFilter, selectedZipFilter };
};


interface ZipHoverPopupProps {
    hoverZip: string;
    zipHoverInfo: ZipHoverInfo | null;
}

// Zip code hover popup and draggable window.
export const ZipHoverPopup: React.FC<ZipHoverPopupProps> = ({ hoverZip, zipHoverInfo }) => {
    if (!hoverZip || !zipHoverInfo) return null; // Ensure valid props before rendering

    return (
        <Popup
            offset={25}
            anchor="bottom"
            latitude={zipHoverInfo.latitude}
            longitude={zipHoverInfo.longitude}
            closeButton={false}
            closeOnClick={false}
        >
            <p className="bg-blue-400 text-black font-bold text-center rounded-t-[4px] p-2">
                Zip Code:
            </p>
            <p className="bg-slate-200 text-black text-center rounded-b-[4px] px-2 py-1">
                {zipHoverInfo.ZIP}
            </p>
        </Popup>
    );
};


// import DraggablePopup from "../../../_mapbox-components/DraggablePopup";

// export const SelectedZipCodesPopup = ({ selectAreaType, selectedZipCodes }) => (
//     selectAreaType === "zip" && (
//         <DraggablePopup>
//             <div
//                 className="absolute bg-white text-black w-[210px] rounded p-2 cursor-move"
//                 style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
//             >
//                 <h4 className="text-center font-bold mb-2">
//                     Selected Zip Codes
//                 </h4>

//                 <div className="h-48 text-sm overflow-auto">
//                     {selectedZipCodes.length > 0 ? (
//                         selectedZipCodes
//                             .slice()
//                             .sort()
//                             .map((zip, index) => (
//                                 <p key={index}>{zip}</p>
//                             ))
//                     ) : (
//                         <p className="text-center text-mw_red">
//                             No zip codes selected
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </DraggablePopup>
//     )
// );
