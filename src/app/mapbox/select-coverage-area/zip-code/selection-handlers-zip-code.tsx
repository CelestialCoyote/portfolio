import { useCallback, useMemo } from "react";
import { Popup } from "react-map-gl";
import DraggablePopup from "../components/draggable-popup";


export const useZipCodeHandlers = ({
    setZipHoverInfo,
    setSelectedZipCodes,
    selectedZipCodes,
    hoverZip
}) => {
    // Handle hover effect for ZIP codes
    const onZipHover = useCallback((event) => {
        const zip = event.features && event.features[0];
        const zipNumber = zip && zip.properties.ZCTA5CE20; // Use ZCTA5CE20 for ZIP codes

        if (zip) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ZIP: zipNumber, // Store ZIP code
            });
        } else {
            setZipHoverInfo(null);
        }
    }, [setZipHoverInfo]);

    // Handle state click for selecting/deselecting
    const onZipClick = useCallback((event) => {
        const zip = event.features && event.features[0];
        const zipNumber = zip && zip.properties.ZCTA5CE20;

        if (zipNumber) {
            setSelectedZipCodes((prevSelected) => {
                // Toggle the state in the selected array
                if (prevSelected.includes(zipNumber)) {
                    return prevSelected.filter((s) => s !== zipNumber);
                } else {
                    return [...prevSelected, zipNumber];
                }
            });
        }
    }, [setSelectedZipCodes]);

    // Filter for highlighted zip (on hover)
    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'ZCTA5CE20', hoverZip]; // Filter based on ZCTA5CE20 (ZIP code)
        } else {
            return ['==', 'ZCTA5CE20', '']; // Default filter for no ZIP hover
        }
    }, [hoverZip]);

    // Filter for selected states
    const selectedZipFilter = useMemo(() => {
        return ['in', 'ZCTA5CE20', ...selectedZipCodes];
    }, [selectedZipCodes]);

    return { onZipHover, onZipClick, zipFilter, selectedZipFilter };
};


// Zip code hover popup and draggable window.
export const ZipHoverPopup = ({ hoverZip, zipHoverInfo }) => (
    hoverZip && (
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
    )
);

export const SelectedZipCodesPopup = ({ selectAreaType, selectedZipCodes }) => (
    selectAreaType === "zip" && (
        <DraggablePopup>
            <div
                className="absolute bg-white text-black w-[210px] rounded p-2 cursor-move"
                style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
            >
                <h4 className="text-center font-bold mb-2">
                    Selected Zip Codes
                </h4>

                <div className="h-48 text-sm overflow-auto">
                    {selectedZipCodes.length > 0 ? (
                        selectedZipCodes
                            .slice()
                            .sort()
                            .map((zip, index) => (
                                <p key={index}>{zip}</p>
                            ))
                    ) : (
                        <p className="text-center text-mw_red">
                            No zip codes selected
                        </p>
                    )}
                </div>
            </div>
        </DraggablePopup>
    )
);
