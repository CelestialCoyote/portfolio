import { useEffect, useState } from "react";
import { MapRef } from "react-map-gl";


type SelectMapStyleProps = {
    mapRef: React.RefObject<MapRef | null>;
};

const mapStyles = [
    { id: 0, label: "Streets", value: "streets-v12" },
    { id: 1, label: "Satellite Streets", value: "satellite-streets-v12" },
    { id: 2, label: "Light", value: "light-v11" },
    { id: 3, label: "Dark", value: "dark-v11" },
    { id: 4, label: "Outdoors", value: "outdoors-v12" }
];

const SelectMapStyle: React.FC<SelectMapStyleProps> = ({ mapRef }) => {
    const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");


    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            mapInstance.setStyle(mapStyle);
        }
    }, [mapStyle, mapRef]);

    const changeMapStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStyle = `mapbox://styles/mapbox/${event.target.value}`;

        setMapStyle(selectedStyle);
    };

    return (
        <div
            className="flex flex-col justify-between bg-white text-black text-center text-base border-2 border-black rounded-lg w-48 mx-auto px-2 py-1"
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <h3 className="text-lg text-center border-black border-b-2 mb-4">
                Map Styles:
            </h3>

            {mapStyles.map(style => (
                <div
                    key={style.id}
                    className="flex items-center text-black text-base mb-2"
                >
                    <input
                        name="mapStyle"
                        type="radio"
                        className="border-transparent focus:border-transparent focus:ring-0 mr-2 hover:bg-blue-500"
                        id={style.label}
                        value={style.value}
                        checked={mapStyle === `mapbox://styles/mapbox/${style.value}`}
                        onChange={changeMapStyle}
                    />

                    <label htmlFor={style.value}>{style.label}</label>
                </div>
            ))}
        </div>
    );
};

export default SelectMapStyle;
