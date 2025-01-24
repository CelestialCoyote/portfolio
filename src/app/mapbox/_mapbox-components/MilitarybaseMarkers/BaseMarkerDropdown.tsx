import React, { useState, useEffect } from "react";
import { MapRef, Popup } from "react-map-gl";
import BaseMarker from "./BaseMarker";
import BaseMarkerControlDropdown from "./BaseMarkerControlDropdown";
import markers from "./us-military-base-markers.json";
import styles from "./map-popup.module.css";


type SelectMapStyleProps = {
    mapRef: React.RefObject<MapRef | null>;
}

type GeoJSONFeature = {
    type: "Feature";
    properties: {
        installation: string;
        branch: string;
        state: string;
        jointBase: boolean | null;
        locationLat: string;
        locationLong: string;
        STATEFP: string;
        NAME: string;
        STUSPS: string;
        zip_codes: string[];
    }
    geometry: {
        type: "Point";
        coordinates: [number, number]; // Ensures exactly two elements.
    }
}

type GeoJSONData = {
    type: "FeatureCollection";
    features: GeoJSONFeature[];
}

type MarkerGroup = {
    [key: string]: GeoJSONFeature[];
}

type MarkerVisibility = {
    [key: string]: boolean;
}

type BranchInfo = {
    id: string;
    branch: string;
    color: string;
}

const branchImages: Record<string, string> = {
    "air-force": "/images/us-military-branch-seals/air-force.png",
    "army": "/images/us-military-branch-seals/army.png",
    "coast-guard": "/images/us-military-branch-seals/coast-guard.png",
    "dod": "/images/us-military-branch-seals/department-of-defense.png",
    "marine-corps": "/images/us-military-branch-seals/marine-corps.png",
    "navy": "/images/us-military-branch-seals/navy.png",
    "space-force": "/images/us-military-branch-seals/space-force.png",
}

const branchData: BranchInfo[] = [
    { id: "air-force", branch: "Air Force", color: "#00308F" },
    { id: "army", branch: "Army", color: "#4B5320" },
    { id: "coast-guard", branch: "Coast Guard", color: "#223C70" },
    { id: "dod", branch: "Department of Defense", color: "#223C70" },
    { id: "marine-corps", branch: "Marine Corps", color: "#A6192E" },
    { id: "navy", branch: "Navy", color: "#000080" },
    { id: "space-force", branch: "Space Force", color: "#009EE0" },
];

const BaseMarkerDropdown: React.FC<SelectMapStyleProps> = ({ mapRef }) => {
    const [hoveredBase, setHoveredBase] = useState<GeoJSONFeature | null>(null);

    const [markerVisibility, setMarkerVisibility] = useState<MarkerVisibility>({
        none: true,
        "air-force": false,
        army: false,
        "coast-guard": false,
        dod: false,
        "marine-corps": false,
        navy: false,
        "space-force": false,
    });

    const [branchMarkers, setBranchMarkers] = useState<MarkerGroup>({
        "air-force": [],
        army: [],
        "coast-guard": [],
        dod: [],
        "marine-corps": [],
        navy: [],
        "space-force": [],
    });

    useEffect(() => {
        const groupedMarkers: MarkerGroup = (markers as GeoJSONData).features.reduce(
            (acc: MarkerGroup, marker: GeoJSONFeature) => {
                const branch = marker.properties.branch;

                if (acc[branch]) {
                    acc[branch].push(marker);
                } else {
                    acc[branch] = [marker];
                }

                return acc;
            },
            {
                "air-force": [],
                army: [],
                "coast-guard": [],
                dod: [],
                "marine-corps": [],
                navy: [],
                "space-force": [],
            }
        );

        setBranchMarkers(groupedMarkers);
    }, []);

    return (
        <>
            {Object.entries(markerVisibility).map(([branchKey, isVisible]) => {
                if (!isVisible) return null;

                const branchMarkerArray = branchMarkers[branchKey] || [];

                return (
                    <BaseMarker
                        key={branchKey}
                        mapRef={mapRef}
                        // data={{ features: branchMarkerArray }}
                        data={{
                            type: "FeatureCollection", // Required by GeoJSONData
                            features: branchMarkerArray, // Your features array
                        }}
                        imagePath={branchImages[branchKey]}
                        setSelectedBase={() => { }} // Placeholder, remove or implement if needed
                        // setSelectedArea={setSelectedArea}
                        setHoveredBase={setHoveredBase}
                    />
                );
            })}

            {hoveredBase && (
                <Popup
                    offset={25}
                    anchor="bottom"
                    latitude={hoveredBase.geometry.coordinates[1]}
                    longitude={hoveredBase.geometry.coordinates[0]}
                    onClose={() => setHoveredBase(null)}
                    closeButton={false}
                >
                    <h3
                        className={styles.popupTitle}
                        style={{
                            backgroundColor:
                                branchData.find((branch) => branch.id === hoveredBase.properties.branch)
                                    ?.color || "#0000FF",
                        }}
                    >
                        Selected Base
                    </h3>

                    <div className="flex flex-col bg-slate-200 text-black px-2 py-1">
                        <div className="flex">
                            <p className="font-bold mr-2">Name:</p>
                            {hoveredBase.properties.installation}
                        </div>

                        <div className="flex">
                            <p className="font-bold mr-2">Branch:</p>
                            {branchData.find((branch) => branch.id === hoveredBase.properties.branch)
                                ?.branch || "Unknown"}
                        </div>
                    </div>
                </Popup>
            )}

            <BaseMarkerControlDropdown
                markerVisibility={markerVisibility}
                setMarkerVisibility={setMarkerVisibility}
            />
        </>
    );
};

export default BaseMarkerDropdown;
