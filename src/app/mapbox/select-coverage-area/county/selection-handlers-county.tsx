import { useCallback, useMemo } from "react";
import { Popup } from "react-map-gl";
import DraggablePopup from "../components/draggable-popup";
import { stateFipsCodes } from "./state-fips-codes";


// Helper function to get the USPS code from STATEFP
const getStateUSPS = (stateFP) => {
    const state = stateFipsCodes.find((state) => state.STATEFP === stateFP);
    return state ? state.STUSPS : stateFP;  // Fallback to STATEFP if not found
};

// Handle hover effect for counties
export const useCountyHandlers = ({
    setCountyHoverInfo,
    setSelectedCounties,
    selectedCounties,
    hoverCounty
}) => {
    // Handle hover effect for counties
    const onCountyHover = useCallback((event) => {
        const county = event.features && event.features[0];
        const countyID = county && county.properties.GEOID;
        const countyName = county && county.properties.NAME;
        const countyState = county && county.properties.STATEFP;

        if (county) {
            setCountyHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                ID: countyID,
                COUNTY: countyName,
                STATE: countyState
            });
        } else {
            setCountyHoverInfo(null);
        }
    }, []);

    // Handle state click for selecting/deselecting
    const onCountyClick = useCallback((event) => {
        const county = event.features && event.features[0];
        const id = county && county.properties.GEOID;
        const name = county && county.properties.NAME;
        const state = county && county.properties.STATEFP;

        if (id) {
            setSelectedCounties((prevSelected) => {
                const alreadySelected = prevSelected.find(c => c.id === id);

                if (alreadySelected) {
                    return prevSelected.filter((c) => c.id !== id);
                } else {
                    return [...prevSelected, { id, name, state }];
                }
            });
        };
    }, []);

    const countyFilter = useMemo(() => {
        if (hoverCounty) {
            return ['in', 'GEOID', hoverCounty]; // Filter based on NAME
        } else {
            return ['==', 'GEOID', '']; // Default filter for no county hover
        }
    }, [hoverCounty]);

    // Filter for selected counties
    const selectedCountyFilter = useMemo(() => {
        const countyIds = selectedCounties.map(county => county.id);

        return ['in', 'GEOID', ...countyIds];
    }, [selectedCounties]);

    return { onCountyHover, onCountyClick, countyFilter, selectedCountyFilter }
};



// County hover popup and draggable window.
export const CountyHoverPopup = ({ hoverCounty, countyHoverInfo }) => (
    hoverCounty && (
        <Popup
            offset={25}
            anchor="bottom"
            latitude={countyHoverInfo.latitude}
            longitude={countyHoverInfo.longitude}
            closeButton={false}
            closeOnClick={false}
        >
            <p className="bg-blue-400 text-black font-bold text-center rounded-t-[4px] p-2">
                County:
            </p>

            <p className="bg-slate-200 text-black text-center rounded-b-[4px] px-2 py-1">
                {countyHoverInfo.COUNTY}
            </p>
        </Popup>
    )
);


export const SelectedCountyPopup = ({ selectAreaType, selectedCounties }) => (
    selectAreaType === "county" && (
        <DraggablePopup>
            <div
                className="absolute bg-white text-black w-[210px] rounded p-2 cursor-move"
                style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
            >
                <h4 className="text-center font-bold mb-2">
                    Selected Counties
                </h4>

                <div className="h-48 text-sm overflow-auto">
                    {selectedCounties.length > 0 ? (
                        selectedCounties
                            .slice()
                            .sort((a, b) => a.name.localeCompare(b.name)) // Optional: sort by county name
                            .map((county, index) => (
                                <p key={index}>
                                    {county.name}, {getStateUSPS(county.state)}
                                </p>
                            ))
                    ) : (
                        <p className="text-center text-mw_red">
                            No counties selected
                        </p>
                    )}
                </div>
            </div>
        </DraggablePopup>
    )
);