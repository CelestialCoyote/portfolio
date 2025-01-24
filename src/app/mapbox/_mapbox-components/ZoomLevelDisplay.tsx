import React, { useEffect, useState } from "react";
import { MapRef } from "react-map-gl";


type ZoomLevelDisplayProps = {
    mapRef: React.RefObject<MapRef | null>;
    initialViewState: {
        longitude: number;
        latitude: number;
        projection: string;
        zoom: number;
        minZoom: number;
        maxZoom: number;
    };
};


const ZoomLevelDisplay: React.FC<ZoomLevelDisplayProps> = ({ mapRef, initialViewState }) => {
    const [zoomLevel, setZoomLevel] = useState(3.5);

    useEffect(() => {
        const handleZoom = () => {
            if (mapRef.current) {
                const currentZoom = mapRef.current.getMap().getZoom();

                setZoomLevel(currentZoom);
            }
        };

        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();

            mapInstance.on('zoom', handleZoom);

            return () => {
                mapInstance.off('zoom', handleZoom);
            };
        }
    }, [mapRef]);

    return (
        <div
            className="flex justify-between items-center bg-white text-black text-center text-base border-2 border-black rounded-lg w-64 mx-auto px-2 py-1"
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <div className="">
                Zoom Level: {zoomLevel.toFixed(2)}
            </div>

            <div
                className="text-black border-2 border-black rounded-xl px-2 py-1 hover:bg-slate-300 cursor-pointer"
                onClick={() => {
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [initialViewState.longitude, initialViewState.latitude],
                            zoom: initialViewState.zoom,
                            duration: 4000
                        });
                    }
                }}
            >
                Reset View
            </div>
        </div>
    );
}

export default ZoomLevelDisplay;
