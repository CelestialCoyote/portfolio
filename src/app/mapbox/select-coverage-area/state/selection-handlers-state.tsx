import { useCallback, useMemo } from "react";
import { MapMouseEvent, Popup } from "react-map-gl";
import DraggablePopup from "../components/draggable-popup";

// Define types for props
interface StateHandlersProps {
    setStateHoverInfo: (info: { longitude: number; latitude: number; STATE: string } | null) => void;
    setSelectedStates: (update: (prevSelected: string[]) => string[]) => void;
    selectedStates: string[];
    hoverState: string | null;
}

// Custom hook for handling state interactions
export const useStateHandlers = ({
    setStateHoverInfo,
    setSelectedStates,
    selectedStates,
    hoverState,
}: StateHandlersProps) => {
    // Handle hover effect for states
    const onStateHover = useCallback((event: MapMouseEvent) => {
        const state = event.features?.[0] as GeoJSON.Feature<GeoJSON.Geometry, { NAME?: string }> | undefined;
        const stateName = state?.properties?.NAME || "";

        if (stateName) {
            setStateHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                STATE: stateName,
            });
        } else {
            setStateHoverInfo(null);
        }
    }, [setStateHoverInfo]);

    // Handle state click for selecting/deselecting
    const onStateClick = useCallback((event: MapMouseEvent) => {
        const state = event.features?.[0] as GeoJSON.Feature<GeoJSON.Geometry, { NAME?: string }> | undefined;
        const name = state?.properties?.NAME;

        if (name) {
            setSelectedStates((prevSelected) =>
                prevSelected.includes(name)
                    ? prevSelected.filter((s) => s !== name)
                    : [...prevSelected, name]
            );
        }
    }, [setSelectedStates]);

    // Filter state for hover effect
    const stateFilter = useMemo(() => {
        return hoverState ? ["in", "NAME", hoverState] : ["==", "NAME", ""];
    }, [hoverState]);

    // Filter for selected states
    const selectedStateFilter = useMemo(() => {
        return ["in", "NAME", ...selectedStates];
    }, [selectedStates]);

    return { onStateHover, onStateClick, stateFilter, selectedStateFilter };
};

// Define types for popup props
interface StateHoverPopupProps {
    hoverState: string | null;
    stateHoverInfo: { longitude: number; latitude: number; STATE: string } | null;
}

// State hover popup component
export const StateHoverPopup = ({ hoverState, stateHoverInfo }: StateHoverPopupProps) => (
    hoverState && stateHoverInfo ? (
        <Popup
            offset={25}
            anchor="bottom"
            latitude={stateHoverInfo.latitude}
            longitude={stateHoverInfo.longitude}
            closeButton={false}
            closeOnClick={false}
        >
            <p className="bg-blue-400 text-black font-bold text-center rounded-t-[4px] p-2">
                State:
            </p>

            <p className="bg-slate-200 text-black text-center rounded-b-[4px] px-2 py-1">
                {stateHoverInfo.STATE}
            </p>
        </Popup>
    ) : null
);

// Define types for selected states popup
interface SelectedStatesPopupProps {
    selectAreaType: string;
    selectedStates: string[];
}

// Selected states popup component
export const SelectedStatesPopup = ({ selectAreaType, selectedStates }: SelectedStatesPopupProps) => (
    selectAreaType === "state" ? (
        <DraggablePopup>
            <div
                className="absolute bg-white text-black w-[210px] rounded p-2 cursor-move"
                style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
            >
                <h4 className="text-center font-bold mb-2">
                    Selected States
                </h4>

                <div className="h-48 text-sm overflow-auto">
                    {selectedStates.length > 0 ? (
                        selectedStates
                            .slice() // create a copy to avoid mutating original state
                            .sort()
                            .map((state, index) => <p key={index}>{state}</p>)
                    ) : (
                        <p className="text-center text-mw_red">No states selected</p>
                    )}
                </div>
            </div>
        </DraggablePopup>
    ) : null
);






// import { useCallback, useMemo } from "react";
// import { MapMouseEvent, Popup } from "react-map-gl";
// import DraggablePopup from "../components/draggable-popup";


// export const useStateHandlers = ({
//     setStateHoverInfo,
//     setSelectedStates,
//     selectedStates,
//     hoverState
// }) => {
//     // Handle hover effect for states
//     const onStateHover = useCallback((event: MapMouseEvent) => {
//         const state = event.features && event.features[0];
//         const stateName = state && state.properties.NAME;

//         if (state) {
//             setStateHoverInfo({
//                 longitude: event.lngLat.lng,
//                 latitude: event.lngLat.lat,
//                 STATE: stateName,
//             });
//         } else {
//             setStateHoverInfo(null);
//         }
//     }, [setStateHoverInfo]);

//     // Handle state click for selecting/deselecting
//     const onStateClick = useCallback((event: MapMouseEvent) => {
//         const state = event.features && event.features[0];
//         const name = state && state.properties.NAME;

//         if (name) {
//             setSelectedStates((prevSelected) => {
//                 if (prevSelected.includes(name)) {
//                     return prevSelected.filter((s) => s !== name);
//                 } else {
//                     return [...prevSelected, name];
//                 }
//             });
//         }
//     }, [setSelectedStates]);

//     // Filter state for hover effect
//     const stateFilter = useMemo(() => {
//         if (hoverState) {
//             return ["in", "NAME", hoverState];
//         } else {
//             return ["==", "NAME", ""];
//         }
//     }, [hoverState]);

//     // Filter for selected states
//     const selectedStateFilter = useMemo(() => {
//         return ["in", "NAME", ...selectedStates];
//     }, [selectedStates]);

//     return { onStateHover, onStateClick, stateFilter, selectedStateFilter };
// };



// // State hover popup and draggable window.
// export const StateHoverPopup = ({ hoverState, stateHoverInfo }) => (
//     hoverState && (
//         <Popup
//             offset={25}
//             anchor="bottom"
//             latitude={stateHoverInfo.latitude}
//             longitude={stateHoverInfo.longitude}
//             closeButton={false}
//             closeOnClick={false}
//         >
//             <p className="bg-blue-400 text-black font-bold text-center rounded-t-[4px] p-2">
//                 State:
//             </p>

//             <p className="bg-slate-200 text-black text-center rounded-b-[4px] px-2 py-1">
//                 {stateHoverInfo.STATE}
//             </p>
//         </Popup>
//     )
// );

// export const SelectedStatesPopup = ({ selectAreaType, selectedStates }) => (
//     selectAreaType === "state" && (
//         <DraggablePopup>
//             <div
//                 className="absolute bg-white text-black w-[210px] rounded p-2 cursor-move"
//                 style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
//             >
//                 <h4 className="text-center font-bold mb-2">
//                     Selected States
//                 </h4>

//                 <div className="h-48 text-sm overflow-auto">
//                     {selectedStates.length > 0 ? (
//                         selectedStates
//                             .slice() // create a copy to avoid mutating original state
//                             .sort()
//                             .map((state, index) => <p key={index}>{state}</p>)
//                     ) : (
//                         <p className="text-center text-mw_red">No states selected</p>
//                     )}
//                 </div>
//             </div>
//         </DraggablePopup>
//     )
// );
